import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/Apis"
import { Alert, Badge, Button, Col, Form, Row, Table } from "react-bootstrap"
import { Doughnut } from "react-chartjs-2"
import { useNavigate, useSearchParams } from "react-router-dom"
import Loading from "../layout/Loading"

const Stat = () => {
    const [countPatient, setCountPatient] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(null)
    const [countMedical, setCountMedical] = useState(null)
    const [revenue, setRevenue] = useState(null)
    const [patients, setPatients] = useState(null)
    const [medicineMin, setMedicineMin] = useState(null)
    const [medicineMax, setMedicineMax] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [type, setType] = useState(1)
    const [q] = useSearchParams()
    const nav = useNavigate()

    const filter = (evt) => {
        evt.preventDefault()
        nav(`/admin/stats/?date=${keyword}&typeStat=${type}`)
    }

    useEffect(() => {
        const loadCountPatient = async () => {
            let res = await authAPI().get(endpoints['countPatient'])
            setCountPatient(res.data)
        }
        const loadTotalRevenue = async () => {
            let res = await authAPI().get(endpoints['totalRevenue'])
            setTotalRevenue(res.data)
        }
        const loadcountMedical = async () => {
            let res = await authAPI().get(endpoints['countMedical'])
            setCountMedical(res.data)
        }

        const loadMedicineStat = async () => {
            let res = await authAPI().get(endpoints['medicineStat'](0))
            setMedicineMax(res.data)
            res = await authAPI().get(endpoints['medicineStat'](1))
            setMedicineMin(res.data)
        }

        const loadFilter = async () => {
            let res = await authAPI().get(`${endpoints['statRevenue']}?date=${q.get('date')}&typeStat=${q.get('typeStat')}`)
            setRevenue(res.data)
            res = await authAPI().get(`${endpoints['amountPatient']}?date=${q.get('date')}&typeStat=${q.get('typeStat')}`)
            setPatients(res.data)
        }

        loadCountPatient()
        loadTotalRevenue()
        loadcountMedical()
        loadMedicineStat()
        if (q.get !== null && keyword !== null)
            loadFilter()
    }, [q])

    return (<>
        <Alert variant="info">Thống kê - báo cáo</Alert>
        {countPatient !== null && countMedical !== null && totalRevenue !== null && medicineMax !== null && medicineMin !== null ? <>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Số lượng bệnh nhân</td>
                        <td>Tổng doanh thu</td>
                        <td>Số lượng ca khám</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{countPatient}</td>
                        <td>{totalRevenue}</td>
                        <td>{countMedical}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="mt-5"></div>
            <Alert variant="success">Thống kê thuốc đã dùng nhiều nhất</Alert>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Tên thuốc</td>
                        <td>Số thuốc</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        medicineMax.map(m => (
                            <tr>
                                <td>{m[0]}</td>
                                <td>{m[1]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="mt-5"></div>
            <Alert variant="success">Thống kê thuốc đã dùng ít nhất</Alert>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Tên thuốc</td>
                        <td>Số thuốc</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        medicineMin.map(m => (
                            <tr>
                                <td>{m[0]}</td>
                                <td>{m[1]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="mt-5"></div>
            <Alert variant="info">Thống kê theo thời gian</Alert>
            <Form onSubmit={filter}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm="2"></Col>
                    <Form.Label column sm="2" style={{ width: '5%', fontSize: '1.5rem' }}>
                        Lọc
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="date" style={{ height: '20%', width: '50%' }} onChange={e => setKeyword(e.target.value)} />
                    </Col>
                    <Col sm="3">
                        <Form.Select size="sm" style={{ width: '35%' }} onChange={e => setType(e.target.value)}>
                            <option value='1'>Năm</option>
                            <option value='2'>Tháng</option>
                            <option value='3'>Quý</option>
                        </Form.Select>
                    </Col>
                    <Col sm="2">
                        <Button style={{ width: '35%' }} variant="success" type="submit">Lọc</Button>
                    </Col>
                </Form.Group>
            </Form>
            
            {revenue !== null && patients !== null?<>
            <Badge bg="info" style={{ marginLeft: 100, marginBottom: 32 }}>Theo Số lượng bệnh nhân</Badge>
            <Table responsive>
                <thead>
                    <tr>
                        <td>SỐ lượng</td>
                        <td>Thời gian</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map(p => (
                            <tr>
                                <td>{p[0]}</td>
                                <td>{p[1]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Badge bg="info" style={{ marginLeft: 100, marginBottom: 32 }}>Theo doanh thu</Badge>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Doanh Thu</td>
                        <td>Thời gian</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        revenue.map(r => (
                            <tr>
                                <td>{r[0]}</td>
                                <td>{r[1]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table></>:<span></span>}
        </> : <Loading />}
        <div className="mt-5"></div>
    </>)
}

export default Stat