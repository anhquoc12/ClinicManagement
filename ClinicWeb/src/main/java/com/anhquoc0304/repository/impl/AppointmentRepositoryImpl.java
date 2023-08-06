/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.repository.AppointmentRepository;
import java.util.Date;
import java.util.List;
import javax.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Admin
 */
@Repository
@Transactional
@PropertySource("classpath:configs.properties")
public class AppointmentRepositoryImpl implements AppointmentRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private Environment env;

    @Override
    public boolean addAppointment(Appointment a) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.save(a);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean countAppointment(Date d) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("SELECT COUNT(*) FROM Appointment a WHERE a.appointmentDate=: date");
        q.setParameter("date", d);
        int number = Integer.parseInt(q.getSingleResult().toString());
        return number < Integer.parseInt(env.getProperty("count.appointment"));
    }

    @Override
    public List<Appointment> getAppointmentByStatus(String status) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Appointment a WHERE a.appointmentStatus =: status");
        q.setParameter("status", status);
        return q.getResultList();
    }
    
}
