/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.service.impl;

import com.anhquoc0304.repository.StatRepository;
import com.anhquoc0304.service.StatService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class StatServiceImpl implements StatService{
    @Autowired
    private StatRepository statRepository;

    @Override
    public int countPatients() {
        return this.statRepository.countPatients();
    }
    @Override
    public int totalRevenue() {
        return this.statRepository.totalRevenue();
    }

    @Override
    public int countMedical() {
        return this.statRepository.countMedical();
    }

    @Override
    public List<Object[]> statRevenue(Map<String, String> params, int typeStat) {
        return this.statRepository.statRevenue(params, typeStat);
    }
    
}
