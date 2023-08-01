/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.anhquoc0304.repository;

import com.anhquoc0304.pojo.User;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface UserRepository {
    List<User> getUsers(String username);
    boolean addUser(User user);
    List<User> getEmployee();
}
