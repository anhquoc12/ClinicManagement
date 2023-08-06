<%-- 
    Document   : admin
    Created on : Aug 4, 2023, 10:19:32 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<style>
    .sidebar {
        background-color: #1b5a90;
        /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
        bottom: 0;
        left: 0;
        margin-top: 0;
        position: fixed;
        top: 60px;
        transition: all 0.2s ease-in-out 0s;
        width: 240px;
        z-index: 1001;
    }
    .sidebar.opened {
        -webkit-transition: all 0.4s ease;
        -moz-transition: all 0.4s ease;
        transition: all 0.4s ease;
    }
    .sidebar-inner {
        height: 100%;
        min-height: 100%;
        transition: all 0.2s ease-in-out 0s;
    }
    .sidebar-menu {
        padding: 15px;
    }
    .sidebar-menu ul {
        font-size: 15px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        position: relative;
    }
    .sidebar-menu li a {
        color: #fff;
        display: block;
        font-size: 16px;
        height: auto;
        padding: 0 20px;
    }
    .sidebar-menu li a:hover {
        color: #5ae8ff;
    }
    .sidebar-menu > ul > li > a:hover {
        background-color: #19c1dc;
        color: #fff;
    }
    .sidebar-menu > ul > li.active > a:hover {
        background-color: #19c1dc;
        color: #fff;
    }
    .sidebar-menu li.active a {
        background-color: #00d0f1;
        color: #fff;
    }
    .menu-title {
        color: #ebebeb;
        display: flex;
        font-size: 14px;
        opacity: 1;
        padding: 5px 15px;
        white-space: nowrap;
    }
    .menu-title > i {
        float: right;
        line-height: 40px;
    }
    .sidebar-menu li.menu-title a {
        color: #ff9b44;
        display: inline-block;
        margin-left: auto;
        padding: 0;
    }
    .sidebar-menu li.menu-title a.btn {
        color: #fff;
        display: block;
        float: none;
        font-size: 15px;
        margin-bottom: 15px;
        padding: 10px 15px;
    }
    .sidebar-menu ul ul a.active {
        color: #20e3ff;
        text-decoration: underline;
    }
    .mobile_btn {
        display: none;
        float: left;
    }
    .sidebar .sidebar-menu > ul > li > a span {
        transition: all 0.2s ease-in-out 0s;
        display: inline-block;
        margin-left: 10px;
        white-space: nowrap;
    }
    .sidebar .sidebar-menu > ul > li > a span.chat-user {
        margin-left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sidebar .sidebar-menu > ul > li > a span.badge {
        margin-left: auto;
    }
    .sidebar-menu ul ul a {
        display: block;
        font-size: 15px;
        padding: 7px 10px 7px 45px;
        position: relative;
    }
    .sidebar-menu ul ul {
        display: none;
    }
    .sidebar-menu ul ul ul a {
        padding-left: 65px;
    }
    .sidebar-menu ul ul ul ul a {
        padding-left: 85px;
    }
    .sidebar-menu > ul > li {
        margin-bottom: 3px;
        position: relative;
    }
    .sidebar-menu > ul > li:last-child {
        margin-bottom: 0;
    }
    .sidebar-menu .menu-arrow {
        -webkit-transition: -webkit-transform 0.15s;
        -o-transition: -o-transform 0.15s;
        transition: transform .15s;
        position: absolute;
        right: 15px;
        display: inline-block;
        font-family: 'FontAwesome';
        text-rendering: auto;
        line-height: 40px;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        -o-transform: translate(0, 0);
        transform: translate(0, 0);
        line-height: 18px;
        top: 11px;
    }
    .sidebar-menu .menu-arrow:before {
        content: "\f105";
    }
    .sidebar-menu li a.subdrop .menu-arrow {
        -ms-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .sidebar-menu ul ul a .menu-arrow {
        top: 10px;
    }
    .sidebar-menu > ul > li > a {
        align-items: center;
        border-radius: 3px;
        display: flex;
        justify-content: flex-start;
        padding: 8px 15px;
        position: relative;
        transition: all 0.2s ease-in-out 0s;
        color: #f1f1f1;
    }
    .sidebar-menu ul li a i {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        text-align: left;
        vertical-align: middle;
        width: 20px;
        transition: all 0.2s ease-in-out 0s;
    }
    .sidebar-menu ul li.menu-title a i {
        font-size: 16px !important;
        margin-right: 0;
        text-align: right;
        width: auto;
    }
    .sidebar-menu li a > .badge {
        color: #fff;
    }
</style>

<div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li class="menu-title"> 
                    <span>Main</span>
                </li>
                <li class="active"> 
                    <a href="index.html"><i class="fe fe-home"></i> <span>Dashboard</span></a>
                </li>
                <li> 
                    <a href="appointment-list.html"><i class="fe fe-layout"></i> <span>Appointments</span></a>
                </li>
                <li> 
                    <a href="specialities.html"><i class="fe fe-users"></i> <span>Specialities</span></a>
                </li>
                <li> 
                    <a href="doctor-list.html"><i class="fe fe-user-plus"></i> <span>Doctors</span></a>
                </li>
                <li> 
                    <a href="patient-list.html"><i class="fe fe-user"></i> <span>Patients</span></a>
                </li>
                <li> 
                    <a href="reviews.html"><i class="fe fe-star-o"></i> <span>Reviews</span></a>
                </li>
                <li> 
                    <a href="transactions-list.html"><i class="fe fe-activity"></i> <span>Transactions</span></a>
                </li>
                <li> 
                    <a href="settings.html"><i class="fe fe-vector"></i> <span>Settings</span></a>
                </li>
                <li class="submenu">
                    <a href="#"><i class="fe fe-document"></i> <span> Reports</span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li><a href="invoice-report.html">Invoice Reports</a></li>
                    </ul>
                </li>
                <li class="menu-title"> 
                    <span>Pages</span>
                </li>
                <li> 
                    <a href="profile.html"><i class="fe fe-user-plus"></i> <span>Profile</span></a>
                </li>
                <li class="submenu">
                    <a href="#"><i class="fe fe-document"></i> <span> Authentication </span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li><a href="login.html"> Login </a></li>
                        <li><a href="register.html"> Register </a></li>
                        <li><a href="forgot-password.html"> Forgot Password </a></li>
                        <li><a href="lock-screen.html"> Lock Screen </a></li>
                    </ul>
                </li>
                <li class="submenu">
                    <a href="#"><i class="fe fe-warning"></i> <span> Error Pages </span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li><a href="error-404.html">404 Error </a></li>
                        <li><a href="error-500.html">500 Error </a></li>
                    </ul>
                </li>
                <li> 
                    <a href="blank-page.html"><i class="fe fe-file"></i> <span>Blank Page</span></a>
                </li>
                <li class="menu-title"> 
                    <span>UI Interface</span>
                </li>
                <li> 
                    <a href="components.html"><i class="fe fe-vector"></i> <span>Components</span></a>
                </li>
                <li class="submenu">
                    <a href="#"><i class="fe fe-layout"></i> <span> Forms </span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li><a href="form-basic-inputs.html">Basic Inputs </a></li>
                        <li><a href="form-input-groups.html">Input Groups </a></li>
                        <li><a href="form-horizontal.html">Horizontal Form </a></li>
                        <li><a href="form-vertical.html"> Vertical Form </a></li>
                        <li><a href="form-mask.html"> Form Mask </a></li>
                        <li><a href="form-validation.html"> Form Validation </a></li>
                    </ul>
                </li>
                <li class="submenu">
                    <a href="#"><i class="fe fe-table"></i> <span> Tables </span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li><a href="tables-basic.html">Basic Tables </a></li>
                        <li><a href="data-tables.html">Data Table </a></li>
                    </ul>
                </li>
                <li class="submenu">
                    <a href="javascript:void(0);"><i class="fe fe-code"></i> <span>Multi Level</span> <span class="menu-arrow"></span></a>
                    <ul style="display: none;">
                        <li class="submenu">
                            <a href="javascript:void(0);"> <span>Level 1</span> <span class="menu-arrow"></span></a>
                            <ul style="display: none;">
                                <li><a href="javascript:void(0);"><span>Level 2</span></a></li>
                                <li class="submenu">
                                    <a href="javascript:void(0);"> <span> Level 2</span> <span class="menu-arrow"></span></a>
                                    <ul style="display: none;">
                                        <li><a href="javascript:void(0);">Level 3</a></li>
                                        <li><a href="javascript:void(0);">Level 3</a></li>
                                    </ul>
                                </li>
                                <li><a href="javascript:void(0);"> <span>Level 2</span></a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);"> <span>Level 1</span></a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
