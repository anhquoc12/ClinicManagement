/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.validation;

import com.anhquoc0304.pojo.User;
import java.util.Set;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Admin
 */
@Component
public class WebAppValidator implements Validator {
    private Set<Validator> springValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        for (Validator v : this.springValidator)
            v.validate(target, errors);
    }

    /**
     * @return the springValidator
     */
    public Set<Validator> getSpringValidator() {
        return springValidator;
    }

    /**
     * @param springValidator the springValidator to set
     */
    public void setSpringValidator(Set<Validator> springValidator) {
        this.springValidator = springValidator;
    }
    
}
