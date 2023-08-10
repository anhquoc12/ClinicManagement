/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.MedicalRecord;
import com.anhquoc0304.repository.MedicalRecordRepository;
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
public class MedicalRecordRepositoryImpl implements MedicalRecordRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public boolean addMedicalRecord(MedicalRecord m) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.save(m);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
    }
    
}
