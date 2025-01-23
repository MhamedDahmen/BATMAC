import React from 'react';
import Sidebar from '../../Sidebar';
import NavbarAdmin from '../NavbarAdmin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { isEmpty } from '../../Utils';
import '../../styles/AdminTables.scss'
import { Modal, Form } from 'react-bootstrap';
import UsersTable from './UsersTable';

function GestionDomains() {
    const [Users, setUsers] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

   
    const getUsers = () => {
        axios.get("http://127.0.0.1:8000/api/users").then((res) => {
            setUsers(res.data);
            console.log(res.data);

        })
    }
    
    useEffect(() => {
        getUsers();
    }, [])
   

    return (
        <div>
            <NavbarAdmin />
            <Sidebar />
            <div className="Qcontainer">
                
                <Table striped bordered hover variant="light"  >
                    <thead>
                        <tr>
                            
                            <th>NOM</th>
                            <th> PRENOM</th>
                            <th> EMAIL</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Users) && Users.map((user) =>
                            <tr>
                                <UsersTable key={user.id} user={user} getUser={getUsers} />

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>



            
        </div>
    )
}
export default GestionDomains