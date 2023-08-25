
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Registers from './component/Registers';
import Home from './component/Home'
import Registers from './component/Registers';
import Login from './component/Login';
import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import MyUserReduce from './reducers/MyUserReduce';
import Patients from './component/Patients';
// import Register from './component/Register';

export const MyUserContext = createContext();

function App() {
  const [user, state] = useReducer(MyUserReduce, Cookies.get('user') || null)

  // Cookies.remove("user")
  // Cookies.remove("token")

  return (
    <>
      <MyUserContext.Provider value={[user, state]}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Registers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/users/patients' element={<Patients />} />
          </Routes>
        </BrowserRouter>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
