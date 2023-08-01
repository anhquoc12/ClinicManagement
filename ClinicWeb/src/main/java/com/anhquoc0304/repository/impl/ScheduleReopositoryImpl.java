/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.Schedule;
import com.anhquoc0304.repository.ScheduleRepository;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Admin
 */
@Repository
@Transactional
public class ScheduleReopositoryImpl implements ScheduleRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public boolean addSchedule(Schedule schedule) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (schedule.getId() == null) {
                s.save(schedule);
                return true;
            }
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
    }
}
