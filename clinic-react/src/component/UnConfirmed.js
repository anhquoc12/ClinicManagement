import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"

const UnConfirmed = () => {
    const [appointments, setAppointment] = useState(null)
    const [confirmed, setConfirmed] = useState(null)

    const confirmAppointment = async (item) => {
        try {
            let res = await authAPI().put(endpoints['confirmed'](item))
            alert(res.data)
        } catch(ex) {
            alert('Có lỗi xảy ra!!! Vui lòng thử lại')
        }
        setConfirmed(true)
    }

    useEffect(() => {
        const loadAppointments = async() => {
            let res = await authAPI().get(endpoints['listConfirmed'])
            setAppointment(res.data)
        }

        loadAppointments()
        setConfirmed(false)
    }, [confirmed])

    if(appointments === null)
        return <Loading />

    return(<>
        <h1 className="text-success text-center mt-5">Lịch cần được xác nhận</h1>
        <Table className="table" responsive>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Tên Bệnh Nhân</td>
                    <td>Ngày Hẹn</td>
                    <td>Khoa Bệnh</td>
                    <td>Mô tả bệnh</td>
                    <td>Xác nhận</td>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map(a => (
                        <tr>
                            <td>{a.id}</td>
                            <td>{a.patientId.fullName}</td>
                            <td>{new Date(a.appointmentDate).toISOString().split('T')[0]}</td>
                            <td>{a.specializationId.name}</td>
                            <td>{a.description}</td>
                            <td>
                                <Button variant="primary" onClick={() => confirmAppointment(a.id)}>Xác nhận</Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </>)
}

export default UnConfirmed