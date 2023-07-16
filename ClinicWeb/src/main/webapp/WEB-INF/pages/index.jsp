<%-- 
    Document   : index
    Created on : Jul 10, 2023, 6:44:29 PM
    Author     : Admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Trang Chủ</title>
        <link href="<c:url value="/css/index.css"/>" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" >
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="javascript:void(0)">
                    <img class="logo" src="<c:url value="/img/logo.png" />" alt="clinic Website" />
                </a>
                <a class="navbar-brand" href="javascript:void(0)">Clinic Website</a>
                <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="javascript:void(0)">Trang Chủ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="javascript:void(0)">Giới Thiệu</a>
                        </li>
                        <!--                        <li class="nav-item">
                                                    <a class="nav-link" href="javascript:void(0)">Link</a>
                                                </li>-->
                    </ul>
                    <div class="d-flex">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link btn btn-success mr-5 signin" href="/">Đăng Nhập</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn btn-danger signin" href="javascript:void(0)">Đăng Ký</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <section id="carosel">
            <!-- Carousel -->
            <div id="demo" class="carousel slide" data-bs-ride="carousel">

                <!-- Indicators/dots -->
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
                </div>

                <!-- The slideshow/carousel -->
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="<c:url value="/img/carosel/carosel_1.jpg" />" alt="Los Angeles" class="d-block w-100 carosel-img">
                    </div>
                    <div class="carousel-item">
                        <img src="<c:url value="/img/carosel/carosel_2.jpg" />" alt="Los Angeles" class="d-block w-100 carosel-img">
                    </div>
                    <div class="carousel-item">
                        <img src="<c:url value="/img/carosel/carosel_3.jpg" />" alt="Los Angeles" class="d-block w-100 carosel-img">
                    </div>
                    <div class="carousel-item">
                        <img src="<c:url value="/img/carosel/carosel_4.jpg" />" alt="Los Angeles" class="d-block w-100 carosel-img">
                    </div>
                    <div class="carousel-item">
                        <img src="<c:url value="/img/carosel/carosel_5.jpg" />" alt="Los Angeles" class="d-block w-100 carosel-img">
                    </div>
                </div>

                <!-- Left and right controls/icons -->
                <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </section>
        <section id="introduce">
            <div class="introduce">
                <p class="text-center h1 text-muted">Liên Hệ Các Bác Sĩ Của Chúng Tôi</p>
                <h3 class="text-center"> Chuyên Nghiệp & <b>Tận Tình </b> </h2>
            </div>
        </section>
        <section>
            <div class="container-fluid mt-3">

                <!-- Control the column width, and how they should appear on different devices -->
                <div class="row">
                    <div class="col-sm-5 bg-dark text-white">
                        <h1 class="text-secondary">Làm hài lòng bệnh nhân</h1>
                        <p>text</p>
                        <ul class="tick-list">
                            <li>first</li>
                            <li>second</li>
                            <li>third</li>
                        </ul>

                    </div>
                    <div class="col-sm-7 bg-dark text-white">50%</div>
                </div>
                <div class="row">
                    <div class="col-sm-5 bg-primary text-white">50%</div>
                    <div class="col-sm-7 bg-dark text-white">50%</div>
                </div>
                <div class="row">
                    <div class="col-sm-5 bg-primary text-white">50%</div>
                    <div class="col-sm-7 bg-dark text-white">50%</div>
                </div>
                <div class="row">
                    <div class="col-sm-5 bg-primary text-white">50%</div>
                    <div class="col-sm-7 bg-dark text-white">50%</div>
                </div>
                <div class="row">
                    <div class="col-sm-5 bg-primary text-white">50%</div>
                    <div class="col-sm-7 bg-dark text-white">50%</div>
                </div>
            </div>
        </section>
        <footer></footer>
    </body>
</html>
