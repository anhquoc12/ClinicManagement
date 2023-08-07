/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.repository.impl;

import com.anhquoc0304.pojo.User;
import com.anhquoc0304.repository.UserRepository;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.TemporalType;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
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
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<User> getUsers(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        String query = "FROM User u ";
        if (!username.isEmpty()) {
            query += "WHERE u.username =: user";
            Query q = s.createQuery(query);
            q.setParameter("user", username);
            return q.getResultList();
        }
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public boolean addOrUpdateUser(User user) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (user.getId() == null)
                s.save(user);
            else
                s.update(user);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    @Override
    public List<User> getEmployee() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM User u WHERE u.userRole = 'DOCTOR' OR u.userRole = 'NURSE'");
        return q.getResultList();
    }

    @Override
    public User getCurrentUser(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM User u WHERE u.username = :user");
        q.setParameter("user", username);
        return (User) q.getResultList().get(0);
    }

    @Override
    public List<Object[]> getUserByUserRole(String userRole) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q;
        if (userRole == User.DOCTOR) {
            q = s.createQuery("SELECT u.id, u.avatar, u.fullName, u.address, u.email, u.phone, s.name FROM Doctor d LEFT JOIN d.userId u LEFT JOIN d.specializationId s WHERE u.userRole = :role");
        } else {
            q = s.createQuery("SELECT u.id, u.avatar, u.fullName, u.address, u.email, u.phone FROM User u WHERE u.userRole = :role");
        }
        q.setParameter("role", userRole);
        return q.getResultList();
    }

    @Override
    public boolean existUsername(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("SELECT u.username FROM User u");
        List<String> usernames = q.getResultList();
        if (usernames.contains(username))
            return true;
        return false;
    }

    @Override
    public User getUserById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM User u WHERE u.id=: key");
        q.setParameter("key", id);
        return (User) q.getSingleResult();
    }

    @Override
    public boolean deleteUser(User user) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.delete(user);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
        }
        return false;
    }

}
