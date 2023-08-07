<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:if test="${msg != null}"><h1 class="alert alert-danger">${msg}</h1></c:if>
    <div class="container" style="margin-top: 50px;">
        <div class="row">
            <div class='col-sm-6'>
                <form action="<c:url value="/viewSchedule/search" />" class="form-group">
                <div class='input-group date' id='datetimepicker1'>
                    <input value="${date}" required name="date" id="startDate" class="form-control" type="date" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                    <input type="submit" class="btn btn-success" value="Tìm Kiếm" />
                </div>
            </form>
        </div>
    </div>
</div>
<c:if test="${count == 0}"><h1 class="alert alert-warning" style="margin: 50px 0;">Không có lịch trực</h1></c:if>
<c:if test="${count > 0}">
    <table class="calendar table table-bordered table-hover" style="margin-top: 50px;">
        <thead>
            <tr>
                <th scope="col" width="${100 /7}%">Tên</th>
                <th scope="col" width="${100 /7}%">Thời gian bắt đầu</th>
                <th scope="col" width="${100 /7}%">Thời Gian Kết thúc</th>
                <th scope="col" width="${100 /7}%">Phòng Trực</th>
                <th scope="col" width="${100 /7}%">Chức Vụ</th>
                <th scope="col" width="${100 /7}%">Khoa Bệnh</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${listSchedule}" var="l">
                <tr>
                    <td class=" no-events" rowspan="1">${l[0]}</td>
                    <td class=" no-events" rowspan="1">${l[1]}</td>
                    <td class=" no-events" rowspan="1">${l[2]}</td>
                    <td class=" no-events" rowspan="1">${l[3]}</td>
                    <td class=" no-events" rowspan="1">${l[4]}</td>
                    <td class="no-events" rowspan="1">${l[5]}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</c:if>