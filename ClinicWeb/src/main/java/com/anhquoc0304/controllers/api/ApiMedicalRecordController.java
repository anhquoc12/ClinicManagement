/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers.api;

import com.anhquoc0304.pojo.MedicalRecord;
import com.anhquoc0304.pojo.Prescription;
import com.anhquoc0304.service.MedicalRecordService;
import com.anhquoc0304.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
    
    @RequestMapping(value = "/doctor/prescription/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addPrescription(@PathVariable(value = "id") int id) {
        MedicalRecord m = this.medicalService.getMedicalRecordById(id);
    }
}
