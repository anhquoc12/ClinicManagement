/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers.api;

import com.anhquoc0304.pojo.Category;
import com.anhquoc0304.pojo.Medicine;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.CategoryService;
import com.anhquoc0304.service.MedicineService;
import com.anhquoc0304.service.UnitMedicineService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
public class ApiMedicineController {
    @Autowired
    private MedicineService medicineService;
    @Autowired
    private UnitMedicineService unitMedicineService;
    @Autowired
    private CategoryService CategoryService;
    
    @RequestMapping(value = "/admin/medicine/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(value = "id") int id) {
        this.medicineService.deleteMedicine(this.medicineService.getMedicineById(id));
    }
    
    @RequestMapping(value = "/admin/medicine/unitMedicine/{id}/", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUnit(@PathVariable(value = "id") int id) {
        this.unitMedicineService.deleteUnit(this.unitMedicineService.getUnitById(id));
    }
    
    @RequestMapping(value = "/admin/medicine/category/{id}/", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable(value = "id") int id) {
        this.CategoryService.deleteCategory(this.CategoryService.getCategoryByid(id));
    }
    
    @RequestMapping("/api/admin/medicines")
    public ResponseEntity<List<Medicine>> listMedicines() {
        return new ResponseEntity<>(this.medicineService.getMedicineByName(null),
                HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/admin/medicine/category/{id}/", method = RequestMethod.DELETE)
    @CrossOrigin
    public ResponseEntity<String> deleteCategoryAPI(@PathVariable(value = "id") int id) {
        try {
            if(this.CategoryService.deleteCategory(this.CategoryService.getCategoryByid(id)))
        {
            return new ResponseEntity<>("DELETE SUCCESS", HttpStatus.OK);
        }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("DELETE FAILED", HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "/api/admin/medicine/category/", method = RequestMethod.POST)
    @CrossOrigin
    public ResponseEntity<Object> addCategory(@RequestParam(value = "name") String name) {
        Category c = new Category();
        c.setName(name);
        if (this.CategoryService.addCategory(c))
            return new ResponseEntity<>(c, HttpStatus.CREATED);
        return new ResponseEntity<>("ADD FAILED!!!", HttpStatus.BAD_REQUEST);
    }
}
