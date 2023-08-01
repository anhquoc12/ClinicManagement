<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--<c:url value="/ClinicWeb/" var="web" />--%>
<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)">
            <img class="logo" src="<c:url value="/img/logo.png" />" alt="clinic Website" />
        </a>
        <a class="navbar-brand" href="javascript:void(0)">Clinic Website</a>
        <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Trang Chủ</a>
                </li>
            </ul>
            <c:if test="${pageContext.request.userPrincipal.name == null}">
                <div class="d-flex">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link btn btn-success mr-5 signin" href="/ClinicWeb/login">Đăng Nhập</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-danger signin" href="/ClinicWeb/register">Đăng Ký</a>
                        </li>
                    </ul>
                </div>
            </c:if>
            <c:if test="${pageContext.request.userPrincipal.name != null}">
                <ul class="navbar-nav">
                    <!-- Avatar -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
                           role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                            <img src="https://res.cloudinary.com/dvevyvqyt/image/upload/v1690464754/download_vuym7n.jpg" class="rounded-circle"
                                 height="22" alt="Avatar" loading="lazy" />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <a class="dropdown-item" href="#">${pageContext.request.userPrincipal.name}</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Account Info</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="<c:url value="/logout" />">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </c:if>
        </div>
    </div>
</nav>
