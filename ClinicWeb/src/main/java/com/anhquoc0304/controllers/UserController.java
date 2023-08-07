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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController {

    @Autowired
    private UserService UserDetailsService;
    @Autowired
    private Cloudinary cloud;
    @Autowired
    private SpecializationService specialService;
    @Autowired
    private DoctorService doctorService;
    
    @ModelAttribute
    public void specialList(Model model) {
        model.addAttribute("specials", this.specialService.getSpecials());
    }

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
    public String addPatient(Model model, @ModelAttribute(value = "user") @Valid User user,
            BindingResult br, HttpServletRequest servlet) {
        if (!br.hasErrors()) {
            List<String> msgErr = new ArrayList<>();
            if (user.getFile() != null) {
                try {
                    Map m = this.cloud.uploader().upload(user.getFile().getBytes(),
                            ObjectUtils.asMap("resource_type", "auto"));
                    user.setAvatar((String) m.get("secure_url"));
                } catch (IOException ex) {
                    msgErr.add("Lỗi khi upload avatar! Vui lòng upload ảnh khác hoặc thử lại");
                    model.addAttribute("msgErr", msgErr);
                    return "register";
                }
            }

            user.setUserRole(User.PATIENT);
            if (this.UserDetailsService.addOrUpdateUser(user)) {
                model.addAttribute("avatar", user.getFile());
                return "login";
            } else {
                msgErr.add("Đã có Lỗi khi đăng ký! Vui Lòng thử lại");
                model.addAttribute("msgErr", msgErr);
                return "register";
            }
        }
        return "register";
    }

    @RequestMapping("/admin/doctor")
    public String doctor(Model model) {
        model.addAttribute("specials", this.specialService.getSpecials());
        model.addAttribute("isDoctor", true);
        model.addAttribute("user", new User());
        return "employee";
    }

    @RequestMapping(value = "/admin/doctor", method = RequestMethod.POST)
    public String addOrUpdateDoctor(@RequestParam(value = "specialization") String special,
            Model model, @ModelAttribute(value = "user") @Valid User user,
            BindingResult br, HttpServletRequest servlet) {
        if (br.hasErrors()) {
            model.addAttribute("specials", this.specialService.getSpecials());
            model.addAttribute("isDoctor", true);
            return "employee";
        }
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
        if (this.UserDetailsService.addOrUpdateUser(user)) {
            // Nếu Thành công
            Doctor d;
            if (user.getId() == null)
                d = new Doctor();
            else
                d = this.doctorService.getDoctorById(user.getId());
            d.setUserId(user);
            d.setSpecializationId(this.specialService.getSpecializationById(Integer.parseInt(special)));
            if (this.doctorService.addOrUpdateDoctor(d)) {
                return "redirect:/";
            } else {
                msg = "Có Lỗi Xảy ra Chuyên Ngành";
            }
        } else {
            msg = "Có lỗi xảy ra";
        }
        model.addAttribute("msg", msg);
        return "index";
    }
    
    @RequestMapping("/admin/doctor/{id}")
    public String updateDoctor(Model model, @PathVariable(value = "id") int id) {
        model.addAttribute("user", this.UserDetailsService.getUserById(id));
//        model.addAttribute("doctor", this.doctorService.getDoctorById(id));
        return "employee";
    }

    @RequestMapping("/admin/nurse")
    public String nurse(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("isDoctor", false);
        return "employee";
    }

    @RequestMapping(value = "/admin/nurse", method = RequestMethod.POST)
    public String addOrUpdateNurse(Model model, @ModelAttribute(value = "user") @Valid User user,
            BindingResult br, HttpServletRequest servlet) {
        if (br.hasErrors()) {
            model.addAttribute("isDoctor", false);
            return "employee";
        }
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
        if (this.UserDetailsService.addOrUpdateUser(user)) {
            return "redirect:/";
        } else {
            msg = "Đã có Lỗi!Vui Lòng thử lại";
        }
        model.addAttribute("msg", msg);
        return "employee";
    }
    
    @RequestMapping("/admin/nurse/{id}")
    public String updateNurse(Model model, @PathVariable(value = "id") int id) {
        model.addAttribute("user", this.UserDetailsService.getUserById(id));
        return "employee";
    }

    @RequestMapping("/admin/users/doctor")
    public String doctors(Model model) {
        model.addAttribute("path", "Doctor");
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.DOCTOR));
        return "users";
    }

    @RequestMapping("/admin/users/patient")
    public String patients(Model model) {
        model.addAttribute("path", "Patient");
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.PATIENT));
        return "users";
    }

    @RequestMapping("/admin/users/nurse")
    public String nurses(Model model) {
        model.addAttribute("path", "Nurse");
        model.addAttribute("userList", this.UserDetailsService.getUserByUserRole(User.NURSE));
        return "users";
    }
}
