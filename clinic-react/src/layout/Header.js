import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import MyUserReduce from '../reducers/MyUserReduce';
import { Button, NavDropdown } from 'react-bootstrap';
import { MyUserContext } from '../App';

const Header = () => {
    const [user, state] = useContext(MyUserContext)
    const logout = () => {
        state({
            'Type': 'logout'
        })
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Clinic Website</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Trang Chủ</Nav.Link> */}
                    <Link to='/' className='nav-item nav-link'>Trang chủ</Link>
                    {user !== null && user.userRole === 'ADMIN'?
                    <NavDropdown title="User" id="basic-nav-dropdown">
                        <Link className='dropdown-item' to='/admin/users/patients' >Bệnh Nhân</Link>
                        <NavDropdown.Item href="#action/3.2">
                            Bác Sỹ
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Y tá</NavDropdown.Item>
                    </NavDropdown>:<span></span>}
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {/* <Link to="/register" className='btn btn-danger'>Đăng Ký</Link>
                    <Link to="/login" className='btn btn-success'>Đăng Nhập</Link> */}
                    {user === null || user === undefined ? <>
                        <Link to="/register" className='btn btn-danger'>Đăng Ký</Link>
                        <Link to="/login" className='btn btn-success'>Đăng Nhập</Link>
                    </> : <>
                        <Link className="nav-link" to="/">Chào {user.fullName}</Link>
                        <Button onClick={logout} variant="secondary">Đăng xuất</Button>
                    </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header