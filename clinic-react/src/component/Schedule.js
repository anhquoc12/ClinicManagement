import { useContext, useEffect, useState } from "react"
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap"
import Loading from "../layout/Loading"
import { authAPI, endpoints } from "../configs/Apis"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { MyUserContext } from "../App"

const Schedule = () => {
    const [user, state] = useContext(MyUserContext)
    const [schedule, setSchedule] = useState(null)
    const [q] = useSearchParams()
    const nav = useNavigate()
    const [keyword, setKeyword] = useState(new Date().toISOString().split('T')[0])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/schedule/view/?date=${keyword}`)
    }

    useEffect(() => {
        const loadSchedule = async () => {
            let res = await authAPI().get(endpoints['schedule'])
            let date = q.get('date')
            if(date !== null )
                res = await authAPI().get(`${endpoints['scheduleSearch']}?date=${date}`)
            setSchedule(res.data)
        }

        loadSchedule()
    }, [q])

    if(schedule === null)
        return <Loading />
        

    return (<>
    {user !== null && user.userRole === 'ADMIN'?<Link className="btn btn-success" to='/schedule/add' style={{ margin: 5 }}>Thêm Lịch Trực</Link>:
    <><h1 className="mt-5"></h1></>}
        
        <Form onSubmit={search}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Col sm="2"></Col>
                <Form.Label column sm="2">
                    Ngày Trực
                </Form.Label>
                <Col sm="3">
                    {keyword === null?<Form.Control type="date" value={new Date().toISOString().split('T')[0]} onChange={e => setKeyword(e.target.value)} />:<Form.Control type="date" value={keyword} onChange={e => setKeyword(e.target.value)} />}
                </Col>
                <Col sm="2">
                    <Button type="submit" variant="success">Tìm Kiếm</Button>
                </Col>
            </Form.Group>
        </Form>
        {
        schedule.length === 0?
            <Alert variant="warning">Không có lịch trực</Alert>:
            <>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Người Trực</th>
                    <th>Thời Gian Bắt Đầu</th>
                    <th>Thời Gian Kết Thúc</th>
                    <th>Phòng Trực</th>
                    <th>Chức vụ</th>
                    <th>Khoa Bệnh</th>
                </tr>
            </thead>
            <tbody>
                {
                    schedule.map(m => (
                        <tr>
                            <td>{m[0]}</td>
                            <td>{m[1]}</td>
                            <td>{m[2]}</td>
                            <td>{m[3]}</td>
                            <td>{m[4]}</td>
                            <td>{m[5]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
            </>
        }
        
    </>)
}
export default Schedule