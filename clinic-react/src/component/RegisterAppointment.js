import { useEffect, useState } from "react"
import Loading from "../layout/Loading"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import { Navigate } from "react-router-dom"

const RegisterAppointment = () => {
    const [specializations, setSpecializations] = useState(null)
    const [appointment, setAppointment] = useState({
        "date": null,
        "description": "",
        "specialization": null
    })
    const [register, setRegister] = useState(false)

    const addAppointment = async(evt) => {
        evt.preventDefault()
        let form = new FormData()
        for (let field in appointment)
            form.append(field, appointment[field])

        try {
            let res = await authAPI().post(endpoints['addAppointment'], form)
            if (res.status === 200)
                alert('SỐ LƯỢNG ĐĂNG KÝ TRONG NGÀY ĐÃ ĐỦ!!! VUI LÒNG CHỌN 1 NGÀY KHÁC')
            else
                alert("Thêm thành công")
            setRegister(true)
        } catch(ex) {
            alert('CÓ LỖI XẢY RA VUI LÒNG THỬ LẠI')
        }
    }

    useEffect(() => {
        const loadSpecializations = async() => {
            let res = await Apis.get(endpoints['specializations'])
            setSpecializations(res.data)
        }

        loadSpecializations()
    }, [])

    if(specializations === null)
        return <Loading />

    if(register)
        return <Navigate to='/list-appointment' />

    return (<>
        <section class="h-100 h-custom"  style={{marginTop: 12}}>
            <div class="banner3">
                <div class="py-5 banner" >
                    <form onSubmit={addAppointment} style={{backgroundImage: 'url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/form-banners/banner2/banner-bg.jpg)'}}>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-7 col-lg-5">
                                    <h3 class="my-3 text-white font-weight-medium text-uppercase">Book Appointment</h3>
                                    <div class="bg-white">
                                        <div class="form-row border-bottom p-4 position-relative">
                                            <label class="text-inverse font-12 text-uppercase">Booking Date</label>
                                            <div class="input-group date">
                                                <input required onChange={e => setAppointment({...appointment, 'date': e.target.value})} type="date" path="appointmentDate" name="appointmentDate" class="border-0 p-0 font-14 form-control" id="appointmentDate" placeholder="Select the Appointment Date" />
                                                <label class="mt-2" for="appointmentDate"><i class="icon-calendar mt-1"></i></label>
                                            </div>
                                        </div>
                                        <div class="form-row border-bottom p-4">
                                            <label class="text-inverse font-12 text-uppercase">Mô Tả Tình Trạng</label>
                                            <textarea required type="text" path="description" name="description" col="1" row="1" id="description"
                                                class="border-0 p-0 font-weight-light font-14 form-control"
                                                placeholder="Write Down the Description" 
                                                onChange={e => setAppointment({...appointment, 'description': e.target.value})}></textarea>
                                        </div>
                                        <div class="form-row border-bottom p-4">
                                            <label class="text-inverse font-12 text-uppercase">Chọn Khoa Khám Bệnh</label>
                                            <select path="specializationId" class="form-select" onChange={e => setAppointment({...appointment, 'specialization': e.target.value})}>
                                                <option value="null" disabled>Chọn Khoa</option>
                                                {specializations.map(s => (
                                                    <option value={s.id}>{s.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <button style={{width: '100%'}} type="submit" class="m-0 border-0 py-4 font-14 font-weight-medium btn btn-danger-gradiant btn-block position-relative rounded-0 text-center text-white text-uppercase">
                                                <span>Đặt Lịch</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}

export default RegisterAppointment