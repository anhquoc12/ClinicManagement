/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.Invoice;
import com.anhquoc0304.pojo.MedicalRecord;
import com.anhquoc0304.pojo.Medicine;
import com.anhquoc0304.pojo.Prescription;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.repository.StatRepository;
import com.anhquoc0304.service.InvoiceService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

/**
 *
 * @author Admin
 */
@Repository
@Transactional
public class StatRepositoryImpl implements StatRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private InvoiceService InvoiceService;

    @Override
    public int countPatients() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("SELECT COUNT(*) FROM User u WHERE u.userRole =: role");
        q.setParameter("role", User.PATIENT);
        return ((Long) q.getSingleResult()).intValue();
    }

    @Override
    public int totalRevenue() {
        Session s = this.factory.getObject().getCurrentSession();
        List<Object[]> revenues = this.InvoiceService.getInvoices();
        BigDecimal total = new BigDecimal(0);
        for (Object[] r : revenues) {
            if (r[3].equals(Invoice.ACCEPTED)) {
                total = total.add(new BigDecimal(r[4].toString()));
            }
        }
        return total.intValue();
    }

    @Override
    public int countMedical() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("SELECT COUNT(*) FROM MedicalRecord r ");
        return ((Long) q.getSingleResult()).intValue();
    }

    @Override
    public List<Object[]> statRevenue(Map<String, String> params, int typeStat) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);

        Root<Invoice> invoiceRoot = cq.from(Invoice.class);
        Join<Invoice, MedicalRecord> medicalRecordJoin = invoiceRoot.join("medicalRecordId");
        Join<MedicalRecord, Prescription> prescriptionJoin = medicalRecordJoin.join("prescriptionSet");
        Join<Prescription, Medicine> medicineJoin = prescriptionJoin.join("medicineId");

        cq.multiselect(
                cb.sum(
                        cb.sum(
                                cb.prod(prescriptionJoin.get("totalUnit"), medicineJoin.get("unitPrice")),
                                medicalRecordJoin.get("examinationFee")
                        )
                ).alias("total"),
                cb.function("YEAR", Integer.class, invoiceRoot.get("createDate")).alias("year1")
        );
        cq.groupBy(cb.function("YEAR", Integer.class, invoiceRoot.get("createDate")), invoiceRoot.get("id"));
        cq.groupBy(cb.function("YEAR", Integer.class, invoiceRoot.get("createDate")));

        return s.createQuery(cq).getResultList();
    }

}
