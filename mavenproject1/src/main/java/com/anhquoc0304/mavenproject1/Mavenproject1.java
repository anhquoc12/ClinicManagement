/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.anhquoc0304.mavenproject1;

/**
 *
 * @author Admin
 */
public class Mavenproject1 {

    public static void main(String[] args) {
        org.springframework.security.crypto.password.PasswordEncoder encoder
   = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
        String passwd = encoder.encode("123456");
        System.out.println(passwd); // print hash
    }
}
