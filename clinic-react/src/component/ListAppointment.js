import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { authAPI, endpoints } from "../configs/Apis";
import Loading from "../layout/Loading";

const ListAppointment = () => {
    const [appointments, setAppointment] = useState(null)
    const [cancle, setCancle] = useState(false)

    const cancleAppointment = async (item) => {
        /* eslint-disable no-restricted-globals */
        if(confirm('Bạn có muốn huỷ hẹn?') === true) {
            try {
                let res = await authAPI().put(endpoints['cancle'](item))
                alert(res.data)
                setCancle(true)
            } catch(ex) {
                alert('CÓ LỖI XẢY RA!!! VUI LÒNG THỬ LẠI')
            }
        }
    }

    useEffect(() => {
        const loadAppointments = async() => {
            let res = await authAPI().get(endpoints['listAppointment'])
            setAppointment(res.data)
        }

        loadAppointments()
        setCancle(false)
    }, [cancle])

    if(appointments === null)
        return <Loading />

    return (<>
        <h1 className="text-center text-success">Lịch sử đăng ký</h1>

        <Table className="table">
            <thead>
                <tr style={{fontWeight: 'bolder'}}>
                    <td>#</td>
                    <td>Ngày hẹn khám</td>
                    <td>Khoa bệnh</td>
                    <td>Mô tả bệnh</td>
                    <td>Trạng thái</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {appointments.map(a => (
                    <tr>
                        <td>{a.id}</td>
                        <td>{new Date(a.appointmentDate).toISOString().split('T')}</td>
                        <td>{a.specializationId.name}</td>
                        <td>{a.description}</td>
                        {a.appointmentStatus === 'CANCLED'?
                        <>
                            <td className="text-danger">&#x2716; {a.appointmentStatus}</td><td></td>
                        </>:a.appointmentStatus === 'WAITTING'?<><td className="text-warning">&#x231B; {a.appointmentStatus}</td>
                        
                        <td><Button variant="danger" onClick={() => cancleAppointment(a.id)}>Huỷ Hẹn</Button></td></>:
                        <><td className="text-success">&#x2714; {a.appointmentStatus}</td><td></td></>}
                    </tr>
                ))}
            </tbody>
        </Table>
    </>)

}

export default ListAppointment