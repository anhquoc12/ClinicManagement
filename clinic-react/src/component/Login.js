
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import apis, { endpoints } from '../configs/Apis';
import { Cookies, useCookies } from 'react-cookie';
// import { Cookies } from 'react-cookie';

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [cookie, setCookie] = useCookies()
    
    const login = (evt) => {
        evt.preventDefault()
        const process = async () => { 
            try {
                let res = await apis.post(endpoints['login'], {
                    "username": username,
                    "password": password
                })
                setCookie('toke', res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        process()
    }


    return (
        <>
            <h1 className="text-center text-success">Đăng Nhập người dùng</h1>
            <Form className="content" onSubmit={login}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên Đăng Nhập</Form.Label>
                    <Form.Control type="text" placeholder="Tên Đăng Nhập" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật Khẩu" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant="primary">Primary</Button>{' '}
            </Form>
        </>
    )
}

export default Login