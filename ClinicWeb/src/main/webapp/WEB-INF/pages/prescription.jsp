<%-- 
    Document   : prescription
    Created on : Aug 10, 2023, 9:33:44 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<style>
    .container{
        padding: 1rem;
        margin: 1rem;
    }
    .table-scroll{
        /*width:100%; */
        display: block;
        empty-cells: show;

        /* Decoration */
        border-spacing: 0;
        border: 1px solid;
    }

    .table-scroll thead{
        background-color: #f1f1f1;
        position:relative;
        display: block;
        width:100%;
        overflow-y: scroll;
    }

    .table-scroll tbody{
        /* Position */
        display: block;
        position:relative;
        width:100%;
        overflow-y:scroll;
        /* Decoration */
        border-top: 1px solid rgba(0,0,0,0.2);
    }

    .table-scroll tr{
        width: 100%;
        display:flex;
    }

    .table-scroll td,.table-scroll th{
        flex-basis:100%;
        flex-grow:2;
        display: block;
        padding: 1rem;
        text-align:left;
    }

    /* Other options */

    .table-scroll.small-first-col td:first-child,
    .table-scroll.small-first-col th:first-child{
        flex-basis:20%;
        flex-grow:1;
    }

    .table-scroll tbody tr:nth-child(2n){
        background-color: rgba(130,130,170,0.1);
    }

    .body-half-screen{
        max-height: 50vh;
    }

    .small-col{
        flex-basis:10%;
    }
    .header {
        border-top: 1px solid black !important;
        border-bottom: 1px solid black !important;
        background-color: #FFFFFF !important;
    }

    .wid50 {
        display: block;
        margin-left: 80px;
        width: 50%;
        border-collapse: collapse;
    }
    .foot {
        border-bottom: 1px solid black;
    }

    .table-col {
        border: 1px solid white !important;
    }
    tr:last-child {
        border-top: 1px solid white !important;
        border-bottom: 1px solid black !important;
    }

</style>
<h1 class="text-center text-success" style="margin: 3px;">Quản Lý Thuốc</h1>
<div class="d-flex flex-row mb-3">
    <div class="p-2">
        <form class="input-group">
            <div class="form-outline">
                <input placeholder="search" name="name" type="search" id="form1" class="form-control" />
                <label class="form-label" for="form1">Search</label>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
    <form class="d-flex flex-row mb-3">
        <div class="p-2">

            <select name="cate" class="form-select">
                <c:forEach items="${categories}" var="category">
                    <option value="${category.id}">${category.name}</option>
                </c:forEach>
            </select>
        </div>
        <div class="p-2">
            <button type="submit" class="btn btn-primary">
                Tìm Kiếm theo danh mục
            </button>
        </div>
    </form>

</div>
<table class="table table-light table-borderless table-scroll small-first-col">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Tên thuốc</th>
            <th scope="col">Đơn Giá</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Loại</th>
            <th scope="col">Đơn vị thuốc</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody class="body-half-screen">
        <c:forEach items="${medicines}" var="medicine">
            <tr>
                <th scope="row">${medicine.id}</th>
                <td>${medicine.name}</td>
                <td><fmt:formatNumber value="${medicine.unitPrice}" pattern="#,###"/> VNĐ</td>
    <td>${medicine.unitInStock}</td>
    <td>${medicine.categoryId.name}</td>
    <td>${medicine.unitMedicineId.name}</td>
    <c:url value="/admin/medicine/${medicine.id}" var="api" />
    <th scope="col"><button onclick="addRow()" class="btn btn-outline-secondary">ADD</button></th>
</tr>
</c:forEach>
</tbody>
</table>
<table class="table caption-top wid50" id="myTable">
    <caption>Toa Thuốc</caption>
    <thead class="header">
        <tr>
            <th scope="col">Tên Thuốc</th>
            <th scope="col">Liều Lượng</th>
            <th scope="col">Tần suất dùng thuốc</th>
            <th scope="col">Thời gian dùng thuốc</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Đơn Vị</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr class="table-col">
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>1</td>
            <td>@mdo</td>
            <td><button>+</button></td>
        </tr>
        <tr class="table-col">
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>1</td>
            <td>@mdo</td>
            <td><button>+</button></td>
        </tr>
    </tbody>
</table>
<script>
    function getRowCount() {
        const tableBody = document.querySelector("#myTable tbody");
        const rowCount = tableBody.rows.length;
        return rowCount
    }

    function addRow() {
        var rowCount = getRowCount()

        const tableBody = document.querySelector("#myTable tbody");
        const newRow = document.createElement("tr");
        newRow.className = "table-col"
        newRow.innerHTML = `
                <td>1</td>
                <td>Người 1</td>
                <td>1}</td>
                <td>1</td>
                <td>Người 1</td>
                <td>1</td>
                <td><button>+</button></td>
            `;

        tableBody.appendChild(newRow);
    }
</script>
