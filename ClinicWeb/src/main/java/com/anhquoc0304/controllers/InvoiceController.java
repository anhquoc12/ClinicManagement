/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers;

import com.anhquoc0304.pojo.Invoice;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.InvoiceService;
import com.anhquoc0304.service.PrescriptionService;
import com.anhquoc0304.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Admin
 */
@Controller
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private UserService userService;
    @Autowired
    private PrescriptionService prescriptionService;

    @RequestMapping("/nurse/invoices")
    public String listInvoices(Model model) {
        System.out.println(this.invoiceService.getInvoices().size());
        model.addAttribute("invoices", this.invoiceService.getInvoices());
        return "invoices";
    }

    @RequestMapping("nurse/invoices/{id}")
    public String detailInvoice(@PathVariable(value = "id") int invoiceId, Model model) {
        User nurse = this.userService.getCurrentUser(SecurityContextHolder.getContext().getAuthentication().getName());
        Invoice i = this.invoiceService.getInvoiceById(invoiceId);
        model.addAttribute("medicines", this.prescriptionService.getPrescirptionForDetailInvoice(i.getMedicalRecordId()));
        model.addAttribute("nurse", nurse);
        model.addAttribute("invoice", i);
        return "payment";
    }
}
