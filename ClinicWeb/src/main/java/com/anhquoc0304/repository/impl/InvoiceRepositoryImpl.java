/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.Invoice;
import com.anhquoc0304.repository.InvoiceRepository;
import java.util.List;
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
public class InvoiceRepositoryImpl implements InvoiceRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Invoice> getInvoices() {
        return null;
    }

    @Override
    public boolean createInvoiceBeforePay(Invoice i) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.save(i);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
        
    }
    
}
