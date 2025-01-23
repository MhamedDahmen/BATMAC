import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const TableSecteur = ({ secteur, getSecteur }) => {
    const [Secteur, setSecteur] = useState(secteur.title);
    const [SecteurDesc, setSecteurDesc] = useState(secteur.description);
    const [Domaine, setDomaine] = useState(secteur.domaine?.title);
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
            title: Secteur,
            description : SecteurDesc ,
            domaine: Domaine
        }


        axios.put(`http://127.0.0.1:8000/batmac/secteur/update/${secteur.id}`, data).then(() => {

            getSecteur();
            handleClose();
        })
    }

    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/secteur/delete/${secteur.id}`).then(() => {
            getSecteur();
            handleCloseDelete();
        })
    }

    return (
        <>




           
            <td>{secteur.title}</td>
            <td>{secteur.description}</td>
            < td>
                <EditOutlined onClick={handleShow} />
                <DeleteOutlined onClick={handleShowDelete} />
            </td>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Secteur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Secteur title</Form.Label>
                            <Form.Control
                                type="text"
                                value={Secteur}
                                required
                                autoFocus
                                onChange={(e) => setSecteur(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Test</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={Domaine}
                                onChange={(e) => setDomaine(e.target.value)}
                                autoFocus />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={SecteurDesc}
                                onChange={(e) => setSecteurDesc(e.target.value)}
                                autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleEdit} style={{marginRight:180}}>
                        Edit Secteur
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


export default TableSecteur;