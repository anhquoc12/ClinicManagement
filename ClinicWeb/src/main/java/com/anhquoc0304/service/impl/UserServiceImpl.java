/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.service.impl;


import com.anhquoc0304.pojo.User;
import com.anhquoc0304.repository.UserRepository;
import com.anhquoc0304.service.UserService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service("UserDetailsService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public List<User> getUsers(String username) {
        return this.userRepo.getUsers(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> users = this.getUsers(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("Không tồn tại tại username");
        }

        User u = users.get(0);
        Set<GrantedAuthority> authoritys = new HashSet<>();
        authoritys.add(new SimpleGrantedAuthority(u.getUserRole()));
        return new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(), authoritys);
    }

    @Override
    public boolean addUser(User user) {
        return false;
//        String pass = user.getPassword();
//        user.setPassword(passwordEncoder.encode(pass));
//        user.setUserRole(this.roleRepo.getRole("ADMIN"));
//        return this.userRepo.addUser(user);
    }

    @Override
    public List<User> getEmployee() {
        return this.userRepo.getEmployee();
    }

}
