/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.utils;

import com.lowagie.text.DocumentException;
import java.io.IOException;

/**
 *
 * @author Admin
 */
public class test {
    public static void main(String[] args) throws IOException, DocumentException {
        ExportPDF pdf = new ExportPDF();
        pdf.export("test", "bcv.pdf");
    }
}
