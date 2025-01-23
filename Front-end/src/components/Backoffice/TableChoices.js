import React from 'react';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
const TablesChoices = ({ choix, getQuestionC }) => {
    const [Choices, setChoices] = useState(choix.choix);
    const [QuestionRef, setQuestionRef] = useState(choix.question?.question);
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



    //edit Domaine

    const handleEdit = () => {
        // e.preventDefault() ; 
       

        const data = {
            choix: Choices,
            question: QuestionRef
        }


        axios.put(`http://127.0.0.1:8000/batmac/choices/update/${choix.id}`, data).then(() => {
            getQuestionC();
            handleClose();
        })
    }
    
    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/choices/delete/${choix.id}`).then(() => {
            getQuestionC();
            handleCloseDelete();
        })
    }

    return (
        <>
            
            
                
                    
                        <td>{choix.id}</td>
                        <td>{choix.choix}</td>
                   
                        < td>
                        <EditOutlined onClick={handleShow} />
                        <DeleteOutlined onClick={handleShowDelete} />
                          </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Choice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Choice</Form.Label>
                            <Form.Control
                                type="text"
                                value={Choices}
                                required
                                autoFocus
                                onChange={(e)=>setChoices(e.target.value)}
                            />
                        </Form.Group>
                       
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Question</Form.Label>
                            <Form.Control 
                              type="text"
                              required
                              value={QuestionRef}
                              onChange={(e)=>setQuestionRef(e.target.value)}
                              autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleEdit} style={{marginRight: 180}}>
                        Edit Choice
                    </Button>
                    <Button variant="secondary" onClick={handleClose} style={{marginRight: 210}}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Choice </Modal.Title>
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
    )  
                   

}


export default TablesChoices;