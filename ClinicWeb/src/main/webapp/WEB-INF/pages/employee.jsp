<%-- 
    Document   : doctor
    Created on : Aug 4, 2023, 4:56:52 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div class="content" style="min-height: 293.6px; margin-top: 10px;">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 offset-md-2">

                <!-- Account Content -->
                <div class="account-content">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-7 col-lg-6 login-left">
                            <img src="https://res.cloudinary.com/dvevyvqyt/image/upload/v1691080126/lrh4log4j28q3lgl5oxf.jpg" class="img-fluid" alt="Login Banner">	
                        </div>
                        <div class="col-md-12 col-lg-6 login-right">
                            <div class="login-header">
                                <h3 class="text text-info">
                                    <c:if test="${isNurse == true}">Add Nurse</c:if>
                                    <c:if test="${isNurse != true}">Add Doctor</c:if>
                                    </h3>
                                </div>

                                <!-- Register Form -->
                            <c:if test="${isNurse == true}"><c:url value="/admin/nurse" var="action" /></c:if>
                            <c:if test="${isNurse != true}"><c:url value="/admin/doctor" var="action" /></c:if>
                            
                            <form:form action="${action}" modelAttribute="user" enctype="multipart/form-data" method="post">
                                <div class="form-group form-focus mb-3">
                                    <form:input path="fullName" type="name" class="form-control floating" />
                                    <label class="focus-label">Họ Và Tên</label>
                                </div>
                                <div class="form-group form-focus mb-3">
                                    <form:input path="username" type="text" class="form-control floating" />
                                    <label class="focus-label">Tên đăng nhập:</label>
                                </div>
                                <div class="form-group form-focus mb-3">
                                    <form:input path="password" type="password" class="form-control floating" />
                                    <label class="focus-label">Password</label>
                                </div>
                                <div class="form-group form-focus mb-3">
                                    <form:input path="address" type="text" class="form-control floating" />
                                    <label class="focus-label">Địa chỉ</label>
                                </div>
                                <div class="form-group form-focus mb-3">
                                    <form:input path="email" type="email" class="form-control floating" />
                                    <label class="focus-label">Email</label>
                                </div>
                                <div class="form-group form-focus mb-3">
                                    <form:input path="phone" type="text" class="form-control floating" />
                                    <label class="focus-label">Phone</label>
                                </div>
                                <c:if test="${isNurse != true}">
                                    <div class="form-group form-focus mb-3">
                                        <select class="form-control floating" name="specialization">
                                            <c:forEach items="${specials}" var="s">
                                                <option value="${s.id}">${s.name}</option>
                                            </c:forEach>
                                        </select>
                                        <label class="focus-label">Khoa Làm Việc</label>
                                    </div>
                                </c:if>
                                <div class="form-group form-focus mb-3">

                                    <form:input path="file" class="form-control form-control-lg" id="formFileLg" type="file" />
                                    <div class="small text-muted mt-2">Upload Avatar của bạn</div>

                                </div>
                                <button class="btn btn-primary btn-block btn-lg login-btn mt-5" type="submit">
                                    <c:if test="${isNurse == true}">Add Nurse</c:if>
                                    <c:if test="${isNurse != true}">Add Doctor</c:if>

                                    </button>
                            </form:form>
                            <!-- /Register Form -->

                        </div>
                    </div>
                </div>
                <!-- /Account Content -->

            </div>
        </div>

    </div>

</div>
