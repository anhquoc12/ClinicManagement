import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"

const AddSchedule = () => {
    const [employees, setEmployees] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [schedule, setSchedule] = useState({
        "date": null,
        "shiftStart": null,
        "shiftEnd": null,
        "user": null,
        "room": null
    })

    const addSchedule = async (evt) => {
        evt.preventDefault()
        let form = new FormData()
        for (let field in schedule)
            form.append(field, schedule[field])
        try {
            let res = await authAPI().post(endpoints['addSchedule'], form)
            alert("Thêm thành công!!!")
        } catch(ex) {
            alert('Có lỗi xảy ra vui lòng thử lại!!!')
        }
    }

    useEffect(() => {
        const loadEmployess = async () => {
            let res = await Apis.get(endpoints['employees'])
            setEmployees(res.data)
        }

        const loadRooms = async () => {
            let res = await authAPI().get(endpoints['rooms'])
            setRooms(res.data)
        }

        loadEmployess()
        loadRooms()
    }, [])

    if (employees === null || rooms === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-danger mt-5">Lịch Trực</h1>
            <Form className="content" onSubmit={addSchedule}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Ngày Trực</Form.Label>
                    <Form.Control required type="date" placeholder="name@example.com" onChange={evt => setSchedule({ ...schedule, 'date': evt.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Thời Gian Bắt đầu</Form.Label>
                    <Form.Control required type="time" rows={3} onChange={evt => setSchedule({ ...schedule, 'shiftStart': evt.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Thời gian kết thúc</Form.Label>
                    <Form.Control type="time" placeholder="name@example.com" onChange={evt => setSchedule({ ...schedule, 'shiftEnd': evt.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Chọn Nhân Viên</Form.Label>
                    <Form.Select value={schedule['user']} aria-label="Default select example" onChange={evt => setSchedule({ ...schedule, 'user': evt.target.value })}>
                        {
                            employees.map(e => (
                                <option value={e.id}>{e.fullName}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Chọn Phòng Trực</Form.Label>
                    <Form.Select value={schedule['room']} required aria-label="Default select example" onChange={evt => setSchedule({ ...schedule, 'room': evt.target.value })}>
                        {
                            rooms.map(r => (
                                <option value={r.id}>{r.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Button variant="success" className="mt-3" type="submit">Tạo Lịch</Button>
            </Form>
        </>
    )
}

export default AddSchedule