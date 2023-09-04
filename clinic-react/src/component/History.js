import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from '../layout/Loading'
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const History = () => {
    const [listHistory, setHistory] = useState(null)
    const [q] = useSearchParams()
    const nav = useNavigate()
    const [keyword, setKeyword] = useState(new Date().toISOString().split('T')[0])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/doctor/history/list/?date=${keyword}`)
    }

    useEffect(() => {
        const loadHistory = async () => {
            let res = await authAPI().get(endpoints['history'])
            let date = q.get('date')
            if (date !== null)
                res = await authAPI().get(`${endpoints['historySearch']}?date=${date}`)
            setHistory(res.data)

        }

        loadHistory()
    }, [q])

    if (listHistory === null)
        return (<Loading />)

    return (<>
        <h1 className="text-success text-center">Lịch sử khám</h1>
        <Form className="container-fluid" onSubmit={search}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Ngày khám bệnh
                </Form.Label>
                <Col sm="3">
                    <Form.Control type="date" value={keyword} onChange={e => setKeyword(e.target.value)} />
                </Col>
                <Col sm="2"><Button variant="info" type="submit">Search</Button></Col>
            </Form.Group>
        </Form>

        <Table className="table align-middle mb-0 bg-white" id="myTable">
            <thead className="bg-light">
                <tr>
                    <th>Tên Bệnh nhân</th>
                    <th>Ngày Khám Bệnh</th>
                    <th>Bác Sỹ Khám Bệnh</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    listHistory.map(h => (
                        // {let url = `/doctor/history/${h.id}`;},
                        <tr>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img src={h.patientId.avatar} alt={h.patientId.username}
                                        style={{ width: 45, height: 45 }} className="rounded-circle" />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{h.patientId.fullName}</p>
                                        <p className="text-muted mb-0">{h.patientId.email}</p>
                                        <p className="text-muted mb-0">{h.patientId.phone}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{new Date(h.createdDate).toDateString()}</p>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img src={h.doctorId.avatar} alt={h.doctorId.username}
                                        style={{ width: 45, height: 45 }} className="rounded-circle" />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{h.doctorId.fullName}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <Link to={`/doctor/history/${h.id}`} className="btn btn-sm btn-rounded text-danger">Xem chi tiết bệnh án</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table >
    </>)
}
export default History