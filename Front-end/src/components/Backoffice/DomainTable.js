import React from 'react';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import axios from 'axios'
const DomainTable = ({ domain, getDomain}) => {



    const [Domaine, setDomaine] = useState(domain.title);
    const [Description, setDescription]= useState(domain?.description);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = () => {
        setShowDelete(true);
    }



    //edit Question

    const handleEdit = () => {
        // e.preventDefault() ; 


        const data = {
            title: Domaine, 
            description: Description
        }


        axios.put(`http://127.0.0.1:8000/batmac/domaine/update/${domain.id}`, data).then(() => {
            getDomain();
            setDomaine("");
            setDescription("");
            handleClose();
        })
    }

    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/domaine/delete/${domain.id}`).then(() => {
            getDomain();
            handleCloseDelete();
        })
    }

    return (
        <>




            
            <td>{domain.title}</td>
            <td> {domain.description}</td>
            <td>
            <EditOutlined onClick={handleShow} />
            <DeleteOutlined onClick={handleShowDelete} />
            </td>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Domain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Domain Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={Domaine}
                                required
                                autoFocus
                                onChange={(e) => setDomaine(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Domain description</Form.Label>
                            <Form.Control
                                type="text"
                                value={Description}
                                required
                                autoFocus
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        
                    </Form>
                </Modal.Body>
                
                <Modal.Footer>
                    
                <Button variant="primary" onClick={handleEdit} style={{marginRight:180}}>
                        Edit Domaine
                    </Button>
                    
                    <Button variant="secondary" onClick={handleClose} style={{marginRight: 210}}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Domaine </Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Deletion</Modal.Body>
                <Modal.Footer>
                   
                    <Button variant="primary" onClick={handleDelete} style={{marginRight:180}}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete} style={{marginRight:210}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    );
}


export default DomainTable;