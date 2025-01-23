import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
const TablesCompetences = ({ competence, getCompetence }) => {
    const [Competence, setCompetence] = useState(competence.title);
    const [CompDesc, setCompDesc] = useState(competence.description);
    const [Secteur, setSecteur] = useState(competence.secteur?.title);
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
            title:Competence,
            description : CompDesc,
            secteur: Secteur
        }


        axios.put(`http://127.0.0.1:8000/batmac/competance/update/${competence.id}`, data).then(() => {

            getCompetence();
            handleClose();
        })
    }

    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/competance/delete/${competence.id}`).then(() => {
            getCompetence();
            handleCloseDelete();
        })
    }

    return (
        <>
            
            
                
                    
                        
                        <td>{competence.title}</td>
                        <td>{competence.description}</td>
                        
                        <td>
                        <EditOutlined onClick={handleShow} />
                        <DeleteOutlined onClick={handleShowDelete} />
                        </td>
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Competence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>competence title</Form.Label>
                            <Form.Control
                                type="text"
                                value={Competence}
                                required
                                autoFocus
                                onChange={(e) => setCompetence(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>competence Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={CompDesc}
                                required
                                autoFocus
                                onChange={(e) => setCompDesc(e.target.value)}
                            />
                        </Form.Group>
                       
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>secteur</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={Secteur}
                                onChange={(e) => setSecteur(e.target.value)}
                                autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleEdit} style={{marginRight:180}}>
                        Edit Competence
                    </Button>
                    <Button variant="secondary" onClick={handleClose} style={{marginRight:210}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Secteur </Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Deletion</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete} style={{marginRight:180}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete} style={{marginRight:210}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>  
                    
                   
        </>
    );
}


export default TablesCompetences;