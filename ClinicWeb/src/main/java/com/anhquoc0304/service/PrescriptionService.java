/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.anhquoc0304.service;

import com.anhquoc0304.pojo.Prescription;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface PrescriptionService {
    boolean addPrescription(Prescription p);
    boolean saveToDatabasePrescription(List<Prescription> listPrescriptions);
}
