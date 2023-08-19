/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.anhquoc0304.controllers.api;

import com.anhquoc0304.pojo.Appointment;
import com.anhquoc0304.pojo.User;
import com.anhquoc0304.service.AppointmentService;
import com.anhquoc0304.service.EmailService;
import com.anhquoc0304.service.UserService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
public class ApiAppointmentController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private AppointmentService appointSevice;
    @Autowired
    private UserService userDetailService;

    @RequestMapping(value = "/listAppointment/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void cancleAppointment(@PathVariable(value = "id") int id) {
        this.appointSevice.setAppointmentStatus(
                this.appointSevice.getAppointmentById(id),
                Appointment.CANCLED);
    }

    @RequestMapping(value = "/nurse/confirm/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void confirmAppointment(@PathVariable(value = "id") int id) {
        Appointment a = this.appointSevice.getAppointmentById(id);
        User nurse = this.userDetailService.getCurrentUser(
                SecurityContextHolder.getContext().getAuthentication().getName());
        a.setNurseId(nurse);
        if (this.appointSevice.setAppointmentStatus(a, Appointment.CONFIRMED)) {
            User patient = a.getPatientId();
            String emailTo = patient.getEmail();
            String subject = "Xác nhận lịch hẹn khám bệnh";
            List<String> paras = new ArrayList<>();
            paras.add(String.format("Chào Ông/Bà %s\n\n", patient.getFullName()));
            paras.add("Chúng tôi xin thông báo rằng lịch hẹn của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết về lịch hẹn:\n\n");
            paras.add("+ Thời gian: " + new SimpleDateFormat("dd/MM/yyyy").format(a.getAppointmentDate()) + "\n\n");
            paras.add(String.format("+ Y tá xác nhận: %s\n\n", nurse.getFullName()));
            paras.add(String.format("+ Số điện thoại liên hệ: %s\n\n", nurse.getPhone()));
            paras.add(String.format("+ Email liên hệ: %s\n\n", nurse.getEmail()));
            paras.add("Nếu bạn có bất kỳ câu hỏi hoặc cần điều chỉnh lịch hẹn, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc địa chỉ email trên để được hỗ trợ.\n\n");
            paras.add("Chúng tôi trân trọng mong đợi sự gặp gỡ của bạn và sẽ làm hết sức để đảm bảo mọi thứ diễn ra suôn sẻ.\n\n");
            paras.add("Trân trọng");
            String content = "";
            for (String p : paras) {
                content += p;
            }
            Map<String, String> params = new HashMap<>();
            params.put("emailTo", emailTo);
            params.put("subject", subject);
            params.put("content", content);
            this.emailService.sendEmail(params);
        }
    }

    @RequestMapping(value = "/nurse/todayAppointment/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void presentAppointment(@PathVariable(value = "id") int id) {
        Appointment a = this.appointSevice.getAppointmentById(id);
        this.appointSevice.setAppointmentStatus(a, Appointment.PRESENT);
    }
}
