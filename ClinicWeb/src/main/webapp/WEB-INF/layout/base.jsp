<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" lang="">
        <title><tiles:insertAttribute name="title" /></title>
        <link type="text/css" href="<c:url value="/css/index.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/register.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/appointment.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/viewSchedule.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/doctor.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/users.css"/>" rel="stylesheet" />
        <link type="text/css" href="<c:url value="/css/forbidden.css"/>" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" >
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <!-- Font Awesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <!-- Google Fonts -->
        <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.css" rel="stylesheet" />
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.js"></script>
    
    <body>
        <tiles:insertAttribute name="header" /> 
        <tiles:insertAttribute name="content" /> 
        <tiles:insertAttribute name="footer" />
    </body>
</html>
