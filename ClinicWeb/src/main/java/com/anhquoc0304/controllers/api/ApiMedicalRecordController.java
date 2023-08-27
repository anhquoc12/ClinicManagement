/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers.api;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.pojo.Invoice;
import com.anhquoc0304.pojo.MedicalRecord;
import com.anhquoc0304.pojo.Prescription;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.InvoiceService;
import com.anhquoc0304.service.MedicalRecordService;
import com.anhquoc0304.service.PrescriptionService;
import com.anhquoc0304.service.UserService;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
public class ApiMedicalRecordController {
    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private MedicalRecordService medicalService;
    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private InvoiceService invoiceService;
    
    @RequestMapping(value = "/api/doctor/medical/", method = RequestMethod.POST)
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<Object> addMedical(Principal doctor,
            @RequestParam Map<String,String> params) {
        User d = this.userService.getCurrentUser(doctor.getName());
        User patient = this.userService.getUserById(
        Integer.parseInt(params.get("patient")));
        MedicalRecord m = new MedicalRecord();
        m.setDoctorId(d);
        m.setAdvice(params.get("advice"));
        m.setConclusion(params.get("conclusion"));
        m.setExaminationFee(new BigDecimal(params.get("examination")));
        m.setNote(params.get("note"));
        m.setSymptom(params.get("symptom"));
        m.setPatientId(patient);
        m.setCreatedDate(new Date());
        if (this.medicalService.addMedicalRecord(m)) {
            Appointment a = this.appointmentService.getAppointmentByPatientId(patient);
            if(this.appointmentService.setAppointmentStatus(a, Appointment.FINISHED)) {
                Invoice i = new Invoice();
                i.setCreateDate(new Date());
                i.setMedicalRecordId(m);
                i.setPaymentStatus(Invoice.PENDING);
                if(this.invoiceService.createInvoiceBeforePay(i))
                    return new ResponseEntity<>(m, HttpStatus.CREATED);
            }
        }
         return new ResponseEntity<>("MEDICAL RECORD FAILED", HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "/api/doctor/medical/patient/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<List<User>> getPatientByToday() {
        return new ResponseEntity<>(this.userService.getPatientByAppointmentToday(),
        HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/doctor/history/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<List<MedicalRecord>> history() {
        return new ResponseEntity<>(this.medicalService.getMedicals(null),
        HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/doctor/history/list-patient/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<Set<User>> listPaitentByHistory() {
        List<MedicalRecord> medicals = this.medicalService.getMedicals(null);
        Set<User> patientList = new HashSet<>();
        for (MedicalRecord medical : medicals) {
            patientList.add(medical.getPatientId());
        }
        return new ResponseEntity<>(patientList, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/doctor/history/search/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<List<MedicalRecord>> searchHistory(
            @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return new ResponseEntity<>(this.medicalService.getMedicals(date),
        HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/doctor/history/{id}/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<MedicalRecord> detailHistory(@PathVariable(value = "id") int id) {
        return new ResponseEntity<>(this.medicalService.getMedicalRecordById(id),
        HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/doctor/history/prescription/{id}/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = {"http://localhost:3000/"})
    public ResponseEntity<List<Prescription>> detailPrescription(@PathVariable(value = "id") int id) {
        return new ResponseEntity<>(this.prescriptionService.getPrescriptionByMedicalRecord(id),
        HttpStatus.OK);
    }
}
