/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.anhquoc0304.repository;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface StatRepository {
    int countPatients();
    int totalRevenue();
    int countMedical();
    List<Object[]> statRevenue(Map<String, String> params, int typeStat);
}
