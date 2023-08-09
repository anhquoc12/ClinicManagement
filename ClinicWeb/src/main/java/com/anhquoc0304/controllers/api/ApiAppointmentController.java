/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers.api;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class ApiAppointmentController {

    @Autowired
    private AppointmentService appointSevice;
    @Autowired
    private UserService userDetailService;

    @RequestMapping(value = "/listAppointment/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void cancleAppointment(@PathVariable(value = "id") int id) {
        this.appointSevice.setAppointmentStatus(
                this.appointSevice.getAppointmentById(id),
                Appointment.CANCLED);
    }

    @RequestMapping(value = "/nurse/confirm/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void confirmAppointment(@PathVariable(value = "id") int id) {
        Appointment a = this.appointSevice.getAppointmentById(id);
        User nurse = this.userDetailService.getCurrentUser(
                SecurityContextHolder.getContext().getAuthentication().getName());
        a.setNurseId(nurse);
        this.appointSevice.setAppointmentStatus(a, Appointment.CONFIRMED);
    }

    @RequestMapping(value = "/nurse/todayAppointment/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void presentAppointment(@PathVariable(value = "id") int id) {
        Appointment a = this.appointSevice.getAppointmentById(id);
        this.appointSevice.setAppointmentStatus(a, Appointment.PRESENT);
    }
}
