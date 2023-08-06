/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.pojo.Doctor;
import com.anhquoc0304.pojo.Specialization;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.DoctorService;
import com.anhquoc0304.service.SpecializationService;
import com.anhquoc0304.service.UserService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Admin
 */
@Controller
public class UserController {

    @Autowired
    private UserService UserDetailsService;
    @Autowired
    private Cloudinary cloud;
    @Autowired
    private SpecializationService specialService;
    @Autowired
    private DoctorService doctorService;

    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String addPatient(Model model, @ModelAttribute(value = "user") User user) {
        String msg = null;
        if (user.getFile() != null) {
            try {
                Map m = this.cloud.uploader().upload(user.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                user.setAvatar((String) m.get("secure_url"));
            } catch (IOException ex) {
                msg = ex.getMessage();
                return "register";
            }
        }
        
        user.setUserRole(User.PATIENT);
        if (this.UserDetailsService.addUser(user)) {
            return "redirect:/login";
        } else {
            msg = "Đã có Lỗi!Vui Lòng thử lại";
        }
        model.addAttribute("msg", msg);
        return "register";
    }

    @RequestMapping("/admin/doctor")
    public String doctor(Model model) {
        model.addAttribute("specials", this.specialService.getSpecials());
        model.addAttribute("user", new User());
        return "employee";
    }

    @RequestMapping(value = "/admin/doctor", method = RequestMethod.POST)
    public String addDoctor(Model model, @ModelAttribute(value = "user") User user,
            @RequestParam(value = "specialization") String special) {
        String msg = null;
        // Lấy avatar
        if (user.getFile() != null) {
            try {
                Map m = this.cloud.uploader().upload(user.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                user.setAvatar((String) m.get("secure_url"));
            } catch (IOException ex) {
                msg = ex.getMessage();
                return "register";
            }
        }
        user.setUserRole(User.DOCTOR);
        if (this.UserDetailsService.addUser(user)) {
                // Nếu Thành công
                Doctor d = new Doctor();
                d.setUserId(user);
                d.setSpecializationId(this.specialService.getSpecializationById(Integer.parseInt(special)));
                if (this.doctorService.addDoctor(d))
                    return "redirect:/";
                else
                    msg = "Có Lỗi Xảy ra Chuyên Ngành";
        }
        else
            msg = "Có lỗi xảy ra";
        model.addAttribute("msg", msg);
        return "employee";
    }
    @RequestMapping("/admin/nurse")
    public String nurse(Model model) {
        model.addAttribute("isNurse", true);
        model.addAttribute("specials", this.specialService.getSpecials());
        model.addAttribute("user", new User());
        return "employee";
    }
    @RequestMapping(value = "/admin/nurse", method = RequestMethod.POST)
    public String addNurse(Model model, @ModelAttribute(value = "nurse") User user) {
        String msg = null;
        if (user.getFile() != null) {
            try {
                Map m = this.cloud.uploader().upload(user.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                user.setAvatar((String) m.get("secure_url"));
            } catch (IOException ex) {
                msg = ex.getMessage();
                return "register";
            }
        }
        user.setUserRole(User.NURSE);
        if (this.UserDetailsService.addUser(user)) {
            return "redirect:/";
        } else {
            msg = "Đã có Lỗi!Vui Lòng thử lại";
        }
        model.addAttribute("msg", msg);
        return "employee";
    }
    
    @RequestMapping("/admin/users/doctor")
    public String doctors(Model model) {
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.DOCTOR));
        return "users";
    }
    
    @RequestMapping("/admin/users/patient")
    public String patients(Model model) {
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.PATIENT));
        return "users";
    }
    
    @RequestMapping("/admin/users/nurse")
    public String nurses(Model model) {
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.NURSE));
        return "users";
    }
}
