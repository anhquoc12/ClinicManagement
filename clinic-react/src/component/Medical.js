import { useEffect, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { Navigate } from "react-router-dom"

const Medical = () => {
    const [medical, setMedical] = useState({
        'patient': '',
        'advice': '',
        'symptom': '',
        'conclusion': '',
        'examination': '',
        'note': ''
    })
    const [patient, setPatient] = useState(null)
    const [id, setId] = useState(null)
    const [complete, setComplete] = useState(false)

    const addMedical = async (evt) => {
        evt.preventDefault()
        let form = new FormData()
        for (let field in medical)
            {
                form.append(field, medical[field])
                console.log(`${field}: ${medical[field]}`)
            }
        console.log(form)
        try {
            let res = await authAPI().post(endpoints['medical'], form)
            alert('Thêm thành công')
            setId(res.data['id'])
            setComplete(true)
        } catch (ex) {
            alert('có lỗi xảy ra')
        }
    }

    useEffect(() => {
        const loadPatients = async () => {
            let res = await authAPI().get(endpoints['listPatientsToday'])
            setPatient(res.data)
        }

        loadPatients()
    }, [])

    if (patient === null)
        return <Loading />
    if (complete)
        return (<Navigate to={`/doctor/medical/prescription/${id}`} />)

    return (
        <>
            <h1 className="text-center text-success mt-5">Phiếu khám bệnh</h1>
            {patient.length === 0?<Alert variant="warning">Không có bệnh nhân</Alert>:<>
            <Form onSubmit={addMedical} className="content" style={{ width: '40%', margin: 'auto' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên bệnh nhân</Form.Label>
                    <Form.Select onChange={e => setMedical({ ...medical, 'patient': e.target.value })}>
                        {
                            patient.map(p => (
                                <option value={p.id}>{p.fullName}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Mô tả triệu chứng</Form.Label>
                    <Form.Control type="text" placeholder="Mô tả triệu chứng" onChange={e => setMedical({ ...medical, 'symptom': e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Kết luận</Form.Label>
                    <Form.Control type="text" placeholder="Kết luận" onChange={e => setMedical({ ...medical, 'conclusion': e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Lời khuyên</Form.Label>
                    <Form.Control type="text" placeholder="Lời khuyên" onChange={e => setMedical({ ...medical, 'advice': e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Phí Khám</Form.Label>
                    <Form.Control type="number" placeholder="Phí Khám" onChange={e => setMedical({ ...medical, 'examination': e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control type="text" placeholder="Ghi chú" onChange={e => setMedical({ ...medical, 'note': e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="outline-primary" style={{ padding: 8 }}>Toa thuốc</Button>
            </Form>
            <h1 className="mt-5"></h1>
                   </> }
        </>
    )
}

export default Medical