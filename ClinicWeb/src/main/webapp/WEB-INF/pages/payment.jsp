<%-- 
    Document   : payment
    Created on : Aug 17, 2023, 1:09:54 AM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="format" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
    
    
</style>
<section class="content--payment">
    <h1 class="title" style="margin-top: 16px !important;">Invoice</h1>
<div>
    <p>${invoice.medicalRecordId.patientId.fullName}</p>
    <p>${invoice.medicalRecordId.patientId.address}</p>
    <p>${invoice.medicalRecordId.patientId.phone}</p>
    <p>${invoice.medicalRecordId.patientId.email}</p>
</div>
</header>
<article>
    <h1>Recipient</h1>
    <table class="meta">
        <tr>
            <th><span>Invoice #</span></th>
            <td><span>${invoice.id}</span></td>
        </tr>
        <tr>
            <th><span>Ngày Thực Hiện</span></th>
            <td><span><format:formatDate pattern="MMM d, yyyy" value="${invoice.createDate}" /></span></td>
        </tr>
        <tr>
            <th><span>Nhân Viên Thanh Toán</span></th>
            <td>${nurse.fullName}</td>
        </tr>
    </table>
    <table class="inventory">
        <thead>
            <tr>
                <th><span>Tên Thuốc</span></th>
                <th><span>Liều Lượng</span></th>
                <th><span>Tần suất dùng thuốc</span></th>
                <th><span>Thời gian sử dụng</span></th>
                <th><span>Số Lượng</span></th>
                <th><span>Thành tiền</span></th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${medicines}" var="m">
            <tr>
                <td><a class="cut">-</a><span>${m[0]}</span></td>
                <td><span>${m[1]}</span></td>
                <td><span>${m[2]}</span></td>
                <td><span>${m[3]}</span></td>
                <td><span>${m[4]}</span></td>
                <td><span>${m[5]}</span></td>
            </tr>
            </c:forEach>
        </tbody>
    </table>
    <table class="balance">
        <tr>
            <th><span>Tổng tiền thuốc</span></th>
            <td><span>600.00</span></td>
        </tr>
        <tr>
            <th><span>Tiền Khám Bệnh</span></th>
            <td><span>0.00</span></td>
        </tr>
        <tr>
            <th><span>Tiền Phải Trả</span></th>
            <td><span>600.00</span></td>
        </tr>
    </table>
</article>
<button class="btn btn-success">Thanh Toán</button>
</section>