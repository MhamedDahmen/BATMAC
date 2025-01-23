import React from 'react';
import {useState} from 'react'; 
import { Form, Button, Spinner } from 'react-bootstrap';
import '../styles/login.scss';
import axios from 'axios';
import NavbarFront from '../components/FrontOffice/NavbarFront';

function AdminLogin() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading]= useState(false)
    const login =(e)=>{
        e.preventDefault();
              setLoading(true);
           const data = {
               username: userName,
               password : password

           }
        axios.post('http://127.0.0.1:8000/api/login', data).then((res)=>{
            localStorage.setItem('token',res.data.token) ; 
             setUserName("");
              setPassword("");
              setLoading(false);
              window.location = "/users" ; 
              
        })
    }
  return (
       <>
       <NavbarFront/>
    <div className='login-container'>
                   <div className='title-container'>
                    <center>
                    <h4> SE CONNECTER </h4>
                    <hr></hr>
                    </center>
                   </div>
                <Form onSubmit={login}>
                
                    <Form.Group className="email-container" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={userName}
                                placeholder="xyz@gmail.com"
                                required
                                autoFocus
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group className="password-container">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                required
                                autoFocus
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <center>
                        <Button className="btn" type="submit" variant="primary">{Loading ?<Spinner animation="border" /> : 'connect' }
                        </Button>
                        </center>
                </Form>
    </div>
    </>
  )
}

export default AdminLogin