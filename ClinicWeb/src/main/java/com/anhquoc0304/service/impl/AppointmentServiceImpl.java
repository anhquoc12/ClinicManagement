/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.service.impl;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.repository.AppointmentRepository;
import com.anhquoc0304.service.AppointmentService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class AppointmentServiceImpl implements AppointmentService{
    @Autowired
    private AppointmentRepository appointRepo;

    @Override
    public boolean addAppointment(Appointment a) {
        a.setCreatedDate(new Date());
        a.setAppointmentStatus(Appointment.WAITTING);
        return this.appointRepo.addAppointment(a);
    }

    @Override
    public boolean countAppointment(Date d) {
        return this.appointRepo.countAppointment(d);
    }

    @Override
    public List<Appointment> getAppointmentByStatus(String status) {
        return this.appointRepo.getAppointmentByStatus(status);
    }
    
}
