/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.pojo.Invoice;
import com.anhquoc0304.pojo.MedicalRecord;
import com.anhquoc0304.pojo.Prescription;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.CategoryService;
import com.anhquoc0304.service.InvoiceService;
import com.anhquoc0304.service.MedicalRecordService;
import com.anhquoc0304.service.MedicineService;
import com.anhquoc0304.service.UserService;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Admin
 */
@Controller
public class MedicordRecordController {

    @Autowired
    private UserService UserService;
    @Autowired
    private MedicalRecordService medicalService;
    @Autowired
    private AppointmentService appointService;
    @Autowired
    private InvoiceService InvoiceService;
    @Autowired
    private MedicineService medicineService;
    @Autowired
    private CategoryService categoryService;

    @RequestMapping("/doctor/medical")
    public String medicalRecord(Model model) {
        model.addAttribute("medicalRecord", new MedicalRecord());
        model.addAttribute("patients", this.UserService.getPatientByAppointmentToday());
        return "medical";
    }

    @RequestMapping(value = "/doctor/medical", method = RequestMethod.POST)
    public String addMedicalRecord(@RequestParam(value = "patient") int patient, Model model, @ModelAttribute(value = "medicalRecord")
            @Valid MedicalRecord m, BindingResult br, HttpServletRequest servlet) {
        if (!br.hasErrors()) {
            User u = this.UserService.getUserById(patient);
            m.setPatientId(u);
            m.setCreatedDate(new Date());
            m.setDoctorId(this.UserService
                    .getCurrentUser(SecurityContextHolder.getContext()
                            .getAuthentication().getName()));
            if (this.medicalService.addMedicalRecord(m)) {
                Appointment a = this.appointService.getAppointmentByPatientId(u);
                if (this.appointService.setAppointmentStatus(a, Appointment.FINISHED)) {
                    Invoice i = new Invoice();
                    i.setCreateDate(new Date());
                    i.setMedicalRecordId(m);
                    i.setPaymentStatus(Invoice.NOPAY);
                    if (this.InvoiceService.createInvoiceBeforePay(i)) {
                        return "redirect:/doctor/prescription";
                    } else {
                        model.addAttribute("msg", "Có lỗi xảy ra");
                    }
                } else {
                    model.addAttribute("msg", "Có lỗi xảy ra");
                }
            } else {
                model.addAttribute("msg", "Có lỗi xảy ra");
            }
        }
        model.addAttribute("patients", this.UserService.getPatientByAppointmentToday());
        return "medical";
    }

    @RequestMapping("/doctor/prescription/{id}")
    public String prescription(Model model, @PathVariable(value = "id") int id) {
        model.addAttribute("medicines", this.medicineService.getMedicineByName(null));
//        MedicalRecord m = this.medicalService.getMedicalRecordById(id);
//        model.addAttribute("medical", m);
        Prescription p = new Prescription();
//        p.setMedicalRecordId(m);
        model.addAttribute("prescription", p);
        return "prescription";
    }
}
