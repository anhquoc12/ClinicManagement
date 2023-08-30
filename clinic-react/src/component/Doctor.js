import { useEffect, useRef, useState } from "react"
import { Alert, Button, Col, Form, Image, Modal, Row, Table } from "react-bootstrap"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const Doctor = () => {
    const [doctors, setDoctors] = useState(null)
    const [q] = useSearchParams()
    const nav = useNavigate()
    const [keyword, setKeyword] = useState()
    const [show, setShow] = useState(false)
    const [id, setId] = useState(null)
    const [avatar, setAvatar] = useState()
    const specialId = useRef()
    const [visible, setVisible] = useState(false)
    const [doctor, setDoctor] = useState({
        "username": "",
        "password": "",
        "fullName": "",
        "address": "",
        "phone": "",
        "email": "",
        "specialId": ""
    })
    const [special, setSpecial] = useState(null)
    const [complete, setComplete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [remove, setRemove] = useState(false)
    const [update, setUpdate] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = async (evt, userId) => {


        let data = await getUserById(userId)
        setId(userId)
        let special = await Apis.get(endpoints['doctor'](userId))
        for (let field in doctor)
            change(evt, field, data[field])
        // change(evt, 'specialId', (special.data["specializationId"]["id"]).toString())
        setShow(true)
    };

    const search = (evt) => {
        evt.preventDefault()
        nav(`/admin/users/doctors/?keyword=${keyword}`)
    }

    const getUserById = async (item) => {
        let res = await Apis.get(endpoints['user'](item))
        return res.data
    }

    const change = (evt, field, value) => {
        setDoctor(current => {
            return { ...current, [field]: value }
        })
    }

    const updateUser = async (item) => {
        try {
            setLoading(true)
            let form = new FormData();
            console.log(endpoints['updateNurse'](id))
            
            for (let field in doctor)
                {
                    if (doctor[field] === undefined && field === 'specialId')
                        form.append(field, '1')
                    else
                        form.append(field, doctor[field]);
                }
            form.append('file', avatar)
            let res = await authAPI().post(endpoints['updateDoctor'](id), form)
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

    const deleteUser = async (item) => {
        let res = await authAPI().delete(endpoints['deleteDoctor'](item))
        alert(res.data)
        setRemove(true)
    }

    useEffect(() => {
        const loadDoctors = async () => {
            let res = await authAPI().get(endpoints['doctors'])
            let name = q.get('keyword')
            if (name !== null)
                res = await authAPI().get(`${endpoints['doctors']}?name=${name}`)
            setDoctors(res.data)
            res = await authAPI().get(endpoints['special'])
            setSpecial(res.data)
        }

        loadDoctors()
        setUpdate(false)
        setRemove(false)
    }, [q, update, remove])




    if (doctors === null || special === null)
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
                        <Form.Control type="text" placeholder="Search..." value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </Col>
                    <Col sm="1">
                        <Button type="submit" variant="info">Tìm kiếm</Button>
                    </Col>
                    <Col sm="2">
                        <Link to='/admin/users/doctor' className="btn btn-success">Thêm Bác Sỹ</Link>
                    </Col>
                </Form.Group>
            </Form>
            <Alert variant="success">Danh Sách Nhân Viên Bác Sỹ</Alert>
            <Table responsive className="ml-20">
                <thead>
                    <tr>
                        <th>Họ Tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Chuyên Khoa</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctors.map((p, index) => (
                            <tr className="wid-30">
                                <td>
                                    <Image src={p[1]} alt={p[0]} roundedCircle width='5%' />
                                    <span>{p[2]}</span>
                                </td>
                                <td>{p[3]}</td>
                                <td>{p[4]}</td>
                                <td>{p[5]}</td>
                                <td>{p[6]}</td>
                                {visible && <td ref={specialId}>{p[7]}</td>}
                                <td><Button variant="warning" onClick={(evt) => handleShow(evt, p[0])} >Cập Nhật</Button></td>
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
                            <Form.Control type="text" placeholder="Họ Và Tên" value={doctor['fullName']} onChange={(evt) => change(evt, 'fullName', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tên Đăng Nhập</Form.Label>
                            <Form.Control type="text" placeholder="Tên Đăng Nhập" value={doctor['username']} onChange={(evt) => change(evt, 'username', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Mật Khẩu" value={doctor['password']} onChange={(evt) => change(evt, 'password', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Địa chỉ" value={doctor['address']} onChange={(evt) => change(evt, 'address', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={doctor['email']} onChange={(evt) => change(evt, 'email', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control type="text" placeholder="Số Điện Thoại" value={doctor['phone']} onChange={(evt) => change(evt, 'phone', evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chuyên khoa</Form.Label>
                            <Form.Select onChange={(evt) => change(evt, 'specialId', evt.target.value)}>
                                {special.map(s => (
                                    <option value={s.id}>{s.name}</option>
                                ))}
                                
                            </Form.Select>
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

export default Doctor