
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)">
            <img class="logo" src="<c:url value="/img/logo.png" />" alt="clinic Website" />
        </a>
        <a class="navbar-brand" href="javascript:void(0)">Clinic Website</a>
        <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="<c:url value="/" />">Trang Chủ</a>
                </li>
                <security:authorize access="hasAuthority('PATIENT')">
                    <li class="nav-item">
                        <a class="nav-link" href="<c:url value="/appointment" />">Đăng Ký Lịch Khám</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">Lịch Sử Đăng Ký</a>
                    </li>
                </security:authorize>
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

                            <img src="${name[0]}" alt="None" class="rounded-circle"
                                 height="22" alt="Avatar" loading="lazy" />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="margin-left: -95px;">
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
<script>
    var Sidemenu = function () {
        this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
        var $this = Sidemenu;
        $('#sidebar-menu a').on('click', function (e) {
            if ($(this).parent().hasClass('submenu')) {
                e.preventDefault();
            }
            if (!$(this).hasClass('subdrop')) {
                $('ul', $(this).parents('ul:first')).slideUp(350);
                $('a', $(this).parents('ul:first')).removeClass('subdrop');
                $(this).next('ul').slideDown(350);
                $(this).addClass('subdrop');
            } else if ($(this).hasClass('subdrop')) {
                $(this).removeClass('subdrop');
                $(this).next('ul').slideUp(350);
            }
        });
        $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }

    // Sidebar Initiate
    init();
</script>
