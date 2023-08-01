<%-- 
    Document   : schedule
    Created on : Jul 30, 2023, 10:47:12 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<h1 class="text-center text-danger">Lịch Trực</h1>
<h1>${err}</h1>
<c:url value="/admin/schedule" var="action" />
<form:form method="post" action="${action}" modelAttribute="schedule">
    <div class="container">
        <div class="card">
            <div class="form-row border-bottom p-4 position-relative">
                <label class="text-inverse font-12 text-uppercase">Chọn Ngày</label>
                <div class="input-group date">
                    <form:input path="scheduleDate" type="date" class="border-0 p-0 font-14 form-control" id="dp" placeholder="Select the Schedule Date" />
                    <label class="mt-2" for="dp"><i class="icon-calendar mt-1"></i></label>
                </div>
            </div>
            <div class="form-row border-bottom p-4 position-relative">
                <label class="text-inverse font-12 text-uppercase">Giờ Bắt Đầu</label>
                <div class="input-group date">
                    <form:input path="shiftStart" type="time" class="border-0 p-0 font-14 form-control" id="dp" placeholder="Select the Schedule Date" />
                    <label class="mt-2" for="dp"><i class="icon-calendar mt-1"></i></label>
                </div>
            </div>
            <div class="form-row border-bottom p-4 position-relative">
                <label class="text-inverse font-12 text-uppercase">Giờ Kết Thúc</label>
                <div class="input-group date">
                    <form:input path="shiftEnd" type="time" class="border-0 p-0 font-14 form-control" id="dp" placeholder="Select the Schedule Date" />
                    <label class="mt-2" for="dp"><i class="icon-calendar mt-1"></i></label>
                </div>
            </div>
            <div class="form-row border-bottom p-4">
                <label class="text-inverse font-12 text-uppercase">Chọn Nhân Viên</label>
                <form:select path="userId" class="form-select">
                    <option value="null" disabled>Chọn Nhân Viên</option>
                    <c:forEach items="${users}" var="i">
                        <option value="${i.id}">${i.fullName}</option>
                    </c:forEach>
                </form:select>
            </div>
            <div class="form-row border-bottom p-4">
                <label class="text-inverse font-12 text-uppercase">Chọn Phòng trực</label>
                <form:select path="roomId" class="form-select">
                    <option value="null" disabled>Chọn Phòng</option>
                    <c:forEach items="${rooms}" var="i">
                        <option value="${i.id}">${i.name}</option>
                    </c:forEach>
                </form:select>
            </div>
            <div>
                <button class="btn btn-success" type="submit">Tạo Lịch</button>
            </div>
        </div>
    </div>
</form:form>
