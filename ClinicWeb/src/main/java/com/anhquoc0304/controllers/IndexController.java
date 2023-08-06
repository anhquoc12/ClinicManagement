/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;




import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.UserService;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Admin
 */
@Controller
public class IndexController {
    @Autowired
    private UserService userService;
    
    @RequestMapping(value = "/")
    public String index(Model model, Principal p) {
        if (p != null)
        {
            User u = this.userService.getCurrentUser(p.getName());
            Object[] infoUser = {u.getAvatar(), u.getFullName()};
            model.addAttribute("name", infoUser);
        }
        return "index";
    }
}
