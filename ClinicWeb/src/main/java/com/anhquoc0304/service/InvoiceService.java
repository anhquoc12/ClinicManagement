/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.anhquoc0304.service;

import com.anhquoc0304.pojo.Invoice;

/**
 *
 * @author Admin
 */
public interface InvoiceService {
    boolean createInvoiceBeforePay(Invoice i);
}