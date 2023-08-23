
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Registers from './component/Registers';
import Home from './component/Home'
import Registers from './component/Registers';
import Login from './component/Login';
// import Register from './component/Register';


function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registers />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
