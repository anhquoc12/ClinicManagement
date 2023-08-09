/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.anhquoc0304.service;

import com.anhquoc0304.pojo.User;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author Admin
 */
public interface UserService extends UserDetailsService {
    List<User> getUsers(String username);
    boolean addOrUpdateUser(User user);
    List<User> getEmployee();
    User getCurrentUser(String username);
    List<Object[]> getUserByUserRole(String userRole);
    boolean existUsername(String username);
    User getUserById(int id);
    boolean deleteUser(User user);
}