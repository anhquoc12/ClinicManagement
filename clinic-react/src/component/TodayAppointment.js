import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/Apis"
import { Button, Table } from "react-bootstrap"
import Loading from "../layout/Loading"

const TodayAppointment = () => {
    const [appointments, setAppointments] = useState(null)
    const[update, setUpdate] = useState(false)

    const present = async(item) => {
        try {
            let res = await authAPI().put(endpoints['present'](item))
            alert(res.data)
        } catch(ex) {
            alert('Có lỗi xảy ra!!!')
        }
        setUpdate(true)
    }

    useEffect(() => {
        const loadToday = async () => {
            let res = await authAPI().get(endpoints['today'])
            setAppointments(res.data)
        }

        loadToday()
        setUpdate(false)
    }, [update])

    if(appointments === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">Danh sách bệnh nhân hôm nay</h1>
            <Table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Tên Bệnh Nhân</td>
                        <td>Khoa bệnh</td>
                        <td>Mô tả bệnh</td>
                        <td>Y Tá xác nhận</td>
                        <td>Yêu cầu xác nhận</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map(a => (
                            <tr>
                                <td>{a.id}</td>
                                <td>{a.patientId.fullName}</td>
                                <td>{a.specializationId.name}</td>
                                <td>{a.description}</td>
                                <td>{a.nurseId.fullName}</td>
                                <td><Button variant="success" onClick={() => present(a.id)}>Đã Đến</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TodayAppointment