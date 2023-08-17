/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.service.StatService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Admin
 */
@Controller
public class StatController {
    @Autowired
    private StatService statService;
    
    @RequestMapping("/admin/stat")
    public String stat(Model model) {
        Map<String, String> params = new HashMap<>();
        List<Object[]> revenues = this.statService.statRevenue(params, 0);
        revenues.forEach(r -> {
            System.out.println(r[0] + " - " + r[1]);
        });
        model.addAttribute("patient", statService.countPatients());
        model.addAttribute("subTotal", this.statService.totalRevenue());
        model.addAttribute("medical", statService.countMedical());
        return "stat";
    }
}
