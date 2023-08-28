import { useEffect, useState } from "react"
import { Alert, Button, Col, Form, Image, Row, Table } from "react-bootstrap"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import cookie from "react-cookies"
import { useNavigate, useSearchParams } from "react-router-dom"

const Patients = () => {
    const [patients, setPatients] = useState(null)
    const[q] = useSearchParams()
    const [keyword, setKeyword] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        const loadPatients = async () => {
            try {
                let response = await authAPI().get(endpoints['patients'])
                setPatients(response.data)
                console.log(response.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadPatients()

    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/admin/users/patients/?keyword=${keyword}`)
    }

    if (patients === null) {
        return (<Loading />)
    }



    return (
        <>
            <Form onSubmit={search} className="mt-5">
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm="1"></Col>
                    <Form.Label column sm="2">
                        Tìm Kiếm
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" placeholder="Search..." value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </Col>
                    <Col sm="1">
                        <Button type="submit" variant="info">Tìm kiếm</Button>
                    </Col>
                </Form.Group>
            </Form>
            <Alert variant="success">Danh Sách bệnh nhân</Alert>
            <Table responsive className="ml-20">
                <thead>
                    <tr>
                        <th>Họ Tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map((p, index) => (
                            <tr>
                                <td>
                                    <Image src={p[1]} alt={p[0]} roundedCircle width='5%' />
                                    <span>{p[2]}</span>
                                </td>
                                <td>{p[3]}</td>
                                <td>{p[4]}</td>
                                <td>{p[5]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Patients