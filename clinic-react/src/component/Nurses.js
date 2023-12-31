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
    const [update, setUpdate] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [complete, setComplete] = useState(false)
    const [id, setId] = useState(null)
    const [nurse, setNurse] = useState({
        "username": "",
        "password": "",
        "fullName": "",
        "address": "",
        "phone": "",
        "email": "",
    })

    const getUserById = async (item) => {
        let res = await Apis.get(endpoints['user'](item))
        return res.data
    }

    const handleClose = () => setShow(false);
    const handleShow = async (evt, userId) => {


        let data = await getUserById(userId)
        setId(userId)
        for (let field in nurse)
            change(evt, field, data[field])
        setShow(true)
    };

    const change = (evt, field, value) => {
        setNurse(current => {
            return { ...current, [field]: value }
        })
    }


    useEffect(() => {
        const loadNurses = async () => {
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

        loadNurses()
        setRemove(false)
        setUpdate(false)
    }, [q, remove, update])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/admin/users/nurses/?keyword=${keyword}`)
    }

    const deleteUser = async (item) => {
        let response = await authAPI().delete(endpoints['deleteNurse'](item));
        alert(response.data)
        setRemove(true)
    }

    const updateUser = async (item) => {
        try {
            setLoading(true)
            let form = new FormData();
            console.log(endpoints['updateNurse'](id))
            for (let field in nurse)
                {
                    console.log(field)
                    console.log(nurse[field])
                    form.append(field, nurse[field]);
                }
            form.append('file', avatar)
            let res = await authAPI().post(endpoints['updateNurse'](id), form)
            if (res.status === 202)
                alert("SỬA THÀNH CÔNG!!!")
            else
                alert(res.data)
            setComplete(true)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
            setUpdate(true)
            handleClose()
        }
    }

    if (nurses === null)
        return <Loading />


    return (
        <>
            <Form onSubmit={search} className="mt-5">
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm="1"></Col>
                    <Form.Label column sm="2">
                        Tìm Kiếm
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" placeholder="Search..." value={keyword} onChange={e => setKeyword(e.target.value)}/>
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
                                <td><Button variant="warning" onClick={(evt) => handleShow(evt, p[0])}>Cập Nhật</Button></td>
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
                            <Form.Control type="text" placeholder="Họ Và Tên" value={nurse['fullName']} onChange={(evt) => change(evt, 'fullName', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tên Đăng Nhập</Form.Label>
                            <Form.Control type="text" placeholder="Tên Đăng Nhập" value={nurse['username']} onChange={(evt) => change(evt, 'username', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Mật Khẩu" value={nurse['password']} onChange={(evt) => change(evt, 'password', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Địa chỉ" value={nurse['address']} onChange={(evt) => change(evt, 'address', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={nurse['email']} onChange={(evt) => change(evt, 'email', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control type="text" placeholder="Số Điện Thoại" value={nurse['phone']} onChange={(evt) => change(evt, 'phone', evt.target.value)} />
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
                    <Button variant="primary" onClick={() => updateUser(id)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Nurses