import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import {DeleteOutlined} from '@ant-design/icons';
import axios from 'axios'
const UsersTable = ({ user, getUser}) => {



    
    const [showDelete, setShowDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   

   
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = () => {
        setShowDelete(true);
    }



    

    

    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/users/${user.id}`).then(() => {
            getUser();
            handleCloseDelete();
        })
    }

    return (
        <>


            <td>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.email}</td>
            
            <td>
            <center>
            <DeleteOutlined onClick={handleShowDelete} /> </center>
            </td>
            
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Domaine </Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Deletion</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    );
}


export default UsersTable;