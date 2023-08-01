<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<section class="h-100 h-custom" style="background-color: #8fc4b7;">
    <div class="banner3">
        <div class="py-5 banner" style="background-image:url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/form-banners/banner2/banner-bg.jpg);">
            <div class="container">
                <div class="row">
                    <div class="col-md-7 col-lg-5">
                        <h3 class="my-3 text-white font-weight-medium text-uppercase">Book Appointment</h3>
                        <div class="bg-white">
                            <div class="form-row border-bottom p-4 position-relative">
                                <label class="text-inverse font-12 text-uppercase">Booking Date</label>
                                <div class="input-group date">
                                    <input type="date" class="border-0 p-0 font-14 form-control" id="dp" placeholder="Select the Appointment Date" />
                                    <label class="mt-2" for="dp"><i class="icon-calendar mt-1"></i></label>
                                </div>
                            </div>
                            <div class="form-row border-bottom p-4">
                                <label class="text-inverse font-12 text-uppercase">Mô Tả Tình Trạng</label>
                                <textarea col="1" row="1" class="border-0 p-0 font-weight-light font-14 form-control" placeholder="Write Down the Description"></textarea>
                            </div>
                            <div class="form-row border-bottom p-4">
                                <label class="text-inverse font-12 text-uppercase">Chọn Khoa Khám Bệnh</label>
                                <select class="form-select">
                                    <option value="null" disabled>Chọn Khoa</option>
                                    <c:forEach items="${listSpecial}" var="i">
                                        <option value="${i.id}">${i.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <div>
                                <button class="m-0 border-0 py-4 font-14 font-weight-medium btn btn-danger-gradiant btn-block position-relative rounded-0 text-center text-white text-uppercase">
                                    <span>Đặt Lịch</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>