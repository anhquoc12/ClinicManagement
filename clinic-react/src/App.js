
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Registers from './component/Registers';
import Home from './component/Home'
import Registers from './component/Registers';
import Login from './component/Login';
import { createContext, useReducer } from 'react';
import MyUserReduce from './reducers/MyUserReduce';
import Patients from './component/Patients';
import cookie from "react-cookies";
import Nurses from './component/Nurses';
import AddNurse from './component/AddNurse';

export const MyUserContext = createContext();

function App() {
  const [user, state] = useReducer(MyUserReduce, cookie.load('user')  || null)


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
            <Route path='/admin/users/nurses' element={<Nurses />} />
            <Route path='/admin/users/nurse' element={<AddNurse />} />
          </Routes>
        </BrowserRouter>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
