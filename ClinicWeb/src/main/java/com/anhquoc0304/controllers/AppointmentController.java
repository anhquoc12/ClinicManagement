/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.pojo.Specialization;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.SpecializationService;
import com.anhquoc0304.service.UserService;
import java.security.Principal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
//import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Admin
 */
@Controller
public class AppointmentController {

    @Autowired
    private SpecializationService specialService;
    @Autowired
    private AppointmentService appoimentService;
    @Autowired
    private UserService userDetailService;

    @ModelAttribute
    public void specials(Model model) {
        List<Specialization> listSpecial = this.specialService.getSpecials();
        model.addAttribute("listSpecial", listSpecial);
    }

    @RequestMapping("/appointment")
    public String appointment(Model model) {
        List<Specialization> listSpecial = this.specialService.getSpecials();
        model.addAttribute("listSpecial", listSpecial);
        model.addAttribute("appointment", new Appointment());
        return "appointment";
    }

    @RequestMapping(value = "/appointment", method = RequestMethod.POST)
    public String addAppointment(Principal p, Model model,
            @ModelAttribute(value = "appointment") @Valid Appointment a,
            BindingResult br, HttpServletRequest servlet) {
        if (!br.hasErrors()) {
            User u = this.userDetailService.getCurrentUser(p.getName());
            a.setPatientId(u);
            if (this.appoimentService.countAppointment(a.getAppointmentDate())) {
                if (this.appoimentService.addAppointment(a)) {
                    return "redirect:/appointment?msgSuccess";
                } else {
                    model.addAttribute("msgErr", "Có lỗi xảy ra vui lòng thử lại");
                    return "appointment";
                }
            } else {
                model.addAttribute("msgWarn", "Ngày này đã đủ lịch khám vui lòng chọn ngày khác");
                return "appointment";
            }
        }
        model.addAttribute("msgErr", "Có lỗi ngoài ý muốn xảy ra vui lòng thử lại");
        return "appointment";
    }
}
