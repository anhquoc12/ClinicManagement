import { useEffect, useState } from "react"
import { Alert, Button, Col, Form, Image, Modal, Row, Table } from "react-bootstrap"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import cookie from "react-cookies"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

const Nurses = () => {
    const [nurses, setNurses] = useState(null)
    const [q] = useSearchParams()
    const [keyword, setKeyword] = useState("")
    const nav = useNavigate()
    const [remove, setRemove] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] =useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [avatar, setAvatar] = useState()
    const [complete, setComplete] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const loadPatients = async () => {
            try {
                let response = await authAPI().get(endpoints['nurses'])
                let name = q.get('keyword')
                if (name != null)
                    response = await authAPI().get(`${endpoints['nurses']}?name=${name}`)
                setNurses(response.data)
                console.log(response.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadPatients()
        setRemove(false)
    }, [q, remove])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/admin/users/nurses/?keyword=${keyword}`)
    }

    const deleteUser = async (item) => {
        let response = await authAPI().delete(endpoints['deleteUser'](item));
        alert(response.data)
        setRemove(true)
    }

    if (nurses === null) {
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
                    <Col sm="1">
                        <Link to='/admin/users/nurse' className="btn btn-success">Thêm Y Tá</Link>
                    </Col>
                </Form.Group>
            </Form>
            <Alert variant="success">Danh Sách Nhân Viên Y Tá</Alert>
            <Table responsive className="ml-20">
                <thead>
                    <tr>
                        <th>Họ Tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nurses.map((p, index) => (
                            <tr className="wid-30">
                                <td>
                                    <Image src={p[1]} alt={p[0]} roundedCircle width='5%' />
                                    <span>{p[2]}</span>
                                </td>
                                <td>{p[3]}</td>
                                <td>{p[4]}</td>
                                <td>{p[5]}</td>
                                <td><Button variant="warning" onClick={handleShow}>Cập Nhật</Button></td>
                                <td><Button variant="danger" onClick={() => deleteUser(p[0])}>Xoá</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin y tá</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Họ Và Tên</Form.Label>
                            <Form.Control type="text" placeholder="Họ Và Tên" onChange={e => setFullName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tên Đăng Nhập</Form.Label>
                            <Form.Control type="text" placeholder="Tên Đăng Nhập" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Mật Khẩu" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Địa chỉ" onChange={e => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control type="text" placeholder="Số Điện Thoại" onChange={e => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
                        </Form.Group>
                        {loading && <Loading />}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Nurses