<%-- 
    Document   : users
    Created on : Aug 4, 2023, 8:37:58 PM
    Author     : Admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="content container-fluid" style="margin-top:30px;">

    <!-- Page Header -->
    <div class="page-header">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="page-title">List of Doctors</h3>
            </div>
        </div>
    </div>
    <!-- /Page Header -->

    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="datatable table table-hover table-center mb-0">
                            <thead>
                                <tr>
                                    <th>Họ Và Tên</th>
                                    <th>Chuyên Khoa</th>
                                    <th>Địa chỉ</th>
                                    <th>email</th>
                                    <th>Số Điện Thoại</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${userList}" var="u">
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <img style="margin-right:50px;" width="50px" class="avatar-img rounded-circle" src="${u[0]}" alt="User Image">
                                                <h7 style="display: inline;">${u[1]}</h5>
                                            </h2>
                                        </td>
                                        <td>${u[2]}</td>

                                        <td>${u[3]}</td>

                                        <td>${u[4]}</td>

                                        <td>${u[5]}</td>
                                        <td><a class="btn btn-danger">Xoá</a></td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>			
    </div>

</div>			
</div>
