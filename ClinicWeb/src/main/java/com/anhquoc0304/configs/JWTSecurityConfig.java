/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.configs;

import com.anhquoc0304.filters.CustomAccessDeniedHandlers;
import com.anhquoc0304.filters.JWTAuthenticationTokenFilter;
import com.anhquoc0304.filters.RestAuthenticationEntryPoint;
import com.anhquoc0304.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 *
 * @author Admin
 */
@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = {
    "com.anhquoc0304.controllers",
    "com.anhquoc0304.service",
    "com.anhquoc0304.repository",
    "com.anhquoc0304.components"
})
@Order(1)
public class JWTSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public JWTAuthenticationTokenFilter jWTAuthenticationTokenFilter() throws Exception {
        JWTAuthenticationTokenFilter jWTAuthenticationTokenFilter = new JWTAuthenticationTokenFilter();
        jWTAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
        return jWTAuthenticationTokenFilter;
    }

    @Bean
    public RestAuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public CustomAccessDeniedHandlers customAccessDeniedHandlers() {
        return new CustomAccessDeniedHandlers();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().ignoringRequestMatchers(new AntPathRequestMatcher("/api/**"));
        http.cors();
        http.authorizeHttpRequests()
                .antMatchers("/api/login/").permitAll()
                .antMatchers("/api/register/").permitAll()
                .antMatchers("/api/users/patient/").permitAll()
                .antMatchers("/api/admin/**").hasAuthority(User.ADMIN)
                .antMatchers("/api/nurse/**").hasAuthority(User.NURSE)
                .antMatchers("/api/doctor/**").hasAuthority(User.DOCTOR)
                .antMatchers("/api/schedule/**").hasAnyAuthority(User.ADMIN, User.DOCTOR, User.NURSE)
                .antMatchers("/api/list-appointment/").hasAuthority(User.PATIENT)
                .antMatchers("/api/appointment/").hasAuthority(User.PATIENT)
                .antMatchers("/api/employees/**").hasAnyAuthority(User.ADMIN, User.DOCTOR, User.NURSE);

        http.antMatcher("/api/**").httpBasic()
                .authenticationEntryPoint(restAuthenticationEntryPoint())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().authorizeHttpRequests()
                .antMatchers("/api/admin/**").hasAuthority(User.ADMIN)
                .antMatchers("/api/nurse/**").hasAnyAuthority(User.NURSE)
                .antMatchers("/api/doctor/**").hasAuthority(User.DOCTOR)
                .antMatchers("/api/list-appointment/**").hasAuthority(User.PATIENT)
                .antMatchers("/api/appointment/").hasAuthority(User.PATIENT)
                .antMatchers("/api/schedule/**").hasAnyAuthority(User.ADMIN, User.DOCTOR, User.NURSE)
                .antMatchers("/api/users/patient/").permitAll()
                .antMatchers("/api/employees/**").hasAnyAuthority(User.ADMIN, User.DOCTOR, User.NURSE)
                .and()
                .addFilterBefore(jWTAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandlers());
    }

}
