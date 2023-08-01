/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.pojo.Room;
import com.anhquoc0304.pojo.Schedule;
import com.anhquoc0304.pojo.Specialization;
import com.anhquoc0304.service.RoomService;
import com.anhquoc0304.service.ScheduleService;
import com.anhquoc0304.service.SpecializationService;
import com.anhquoc0304.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Admin
 */
@Controller
public class ScheduleController {
    @Autowired
    private RoomService roomService;
    @Autowired
    private UserService userService;
    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private SpecializationService specializationService;
    
    @RequestMapping("/admin/schedule")
    public String schedule(Model model) {
        model.addAttribute("schedule", new Schedule());
        model.addAttribute("rooms", this.roomService.getRooms());
        model.addAttribute("users", this.userService.getEmployee());
        return "schedule";
    }
    
    @RequestMapping(value="/admin/schedule", method = RequestMethod.POST)
    public String addSchedule(@ModelAttribute(value = "schedule") Schedule schedule, Model model) {
        model.addAttribute("err", schedule.getUserId().getUsername());
        return "index";
//        if (this.scheduleService.addSchedule(schedule))
//            return "appointment";
//        else {
//            model.addAttribute("err", "Có lỗi vui lòng xử lý lại");
//            return "schedule";
//        }
    }
    
    @RequestMapping("/admin/room")
    public String room(Model model) {
        model.addAttribute("rooms", this.roomService.getRooms());
        model.addAttribute("room", new Room());
        return "room";
    }
    
    @RequestMapping(value = "/admin/room", method = RequestMethod.POST)
    public String addRoom(Model model, @ModelAttribute(value = "room") Room room) {
        model.addAttribute("msgErr", null);
        if (this.roomService.addRoom(room)) {
            return "redirect:/admin/room";
        }
        else {
            model.addAttribute("msgErr", "Có lỗi xảy ra");
            return "forward:/admin/room";
        }
    }
    
    @RequestMapping("/admin/specialization")
    public String specialization(Model model) {
        model.addAttribute("special", new Specialization());
        model.addAttribute("specials", this.specializationService.getSpecials());
        return "specialization";
    }
    @RequestMapping(value = "/admin/specialization", method = RequestMethod.POST)
    public String addSpecialization(Model model, @ModelAttribute(value = "special") Specialization s) {
        model.addAttribute("msgErr", null);
        if (this.specializationService.addSpecialization(s)) {
            return "redirect:/admin/specialization";
        }
        else {
            model.addAttribute("msgErr", "Có lỗi xảy ra");
            return "forward:/admin/specialization";
        }
    }
}
