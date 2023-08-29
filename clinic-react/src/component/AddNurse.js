import { Button, Form } from "react-bootstrap"
import Loading from "../layout/Loading"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import Apis, { authAPI, endpoints } from "../configs/Apis"

const AddNurse = () => {

    const [username, setUsername] = useState()
        const [password, setPassword] = useState()
        const [fullName, setFullName] = useState()
        const [email, setEmail] = useState()
        const [phone, setPhone] = useState()
        const [address, setAddress] = useState()
        const [avatar, setAvatar] = useState()
        const [loading, setLoading] = useState(false)
        const [complete, setComplete] = useState(false)

        const addNurse = (evn) => {
            evn.preventDefault()
            const process = async () => {
                try {
                    setLoading(true)
                    let formData = new FormData()
                    let res = null
                    formData.append("file", avatar)
                    formData.append("username", username)
                    formData.append("password", password)
                    formData.append("fullName", fullName)
                    formData.append("email", email)
                    formData.append("phone", phone)
                    formData.append("address", address)
                    res = await authAPI().post(endpoints['AddNurse'], formData)
                    console.log(res.data)
                    setComplete(true)
                } catch (ex) {
                    console.log(ex)
                } finally {
                    setLoading(false)
                }
            }

            process()
        }

        if (complete)
            return (<Navigate to='/admin/users/nurses' />)

        return (
            <>
                <h1 className="text-success text-center">Thêm Y Tá</h1>
                <Form className="content" onSubmit={addNurse}>
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
                    <Button type="submit" variant="success">Thêm y Tá</Button>
                </Form>
            </>
        )
}
export default AddNurse