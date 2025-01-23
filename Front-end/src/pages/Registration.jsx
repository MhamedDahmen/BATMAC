import React, { useState } from 'react';
import axios from 'axios';
import { Form,Button, Spinner } from 'react-bootstrap';
import '../styles/register.css'
import NavbarFront from '../components/FrontOffice/NavbarFront';

function Registration() {
    const [Name,setName]= useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [plainPassword, setPlainPassword] = useState("");
    const [loading, setLoading] = useState(false);

          const handleSubmit =(e)=> {
              e.preventDefault();
              
              const data = {
                  nom: LastName,
                  prenom: Name,
                  email : Email,
                  plainPassword : plainPassword
              }
              axios.post ('http://127.0.0.1:8000/api/users', data).then(()=>{
                  setName("");
                  setLastName ("");
                  setEmail("");
                  setPlainPassword("");
                  setLoading(false);
                  window.location ="/login";
              })
          }

  return (

        <> <NavbarFront/>
        
    <div className='register-container'>
           <div className='title1-container'>
                    <center>
                    <h4> S'INSCRIRE </h4>
                    <hr></hr>
                    </center>
                   </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={LastName}
                                
                                required
                                autoFocus
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3" >
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control
                                type="text"
                                value={Name}
                                required
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={Email}
                                required
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={plainPassword}
                                required
                                autoFocus
                                onChange={(e) => setPlainPassword(e.target.value)}
                            />
                        </Form.Group>
                    <center>   <Button className='btnR' type="submit" variant="primary">{loading? <Spinner animation="border"/>: "s'inscrire"}</Button> </center> 
        </Form>
    </div>
    </>
  )
}

export default Registration