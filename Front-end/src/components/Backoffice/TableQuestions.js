import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
const TableQuestions = ({ question, getQuestionT }) => {

    const [Question, setQuestion] = useState(question.question);
    const [solution, setSolution] = useState(question.solution);
    const [Test, setTest] = useState(question.test?.title);
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
            question: Question,
            solution: solution,
            test: Test
        }


        axios.put(`http://127.0.0.1:8000/batmac/questions/update/${question.id}`, data).then(() => {

            getQuestionT();
            handleClose();
        })
    }
    
    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/questions/delete/${question.id}`).then(() => {
            getQuestionT();
            handleCloseDelete();
        })
    }


    return (
        <>
            <td>{question.id}</td>
            <td>{question.question}</td>
            <td>{question.solution}</td>
            < td>
            <EditOutlined onClick={handleShow} />
                        <DeleteOutlined onClick={handleShowDelete} />
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Question Content</Form.Label>
                            <Form.Control
                                type="text"
                                value={Question}
                                required
                                autoFocus
                                onChange={(e)=>setQuestion(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Solution</Form.Label>
                            <Form.Control 
                              type="text"
                              value={solution}
                              onChange={(e)=>setSolution(e.target.value)}
                              required
                              autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Test</Form.Label>
                            <Form.Control 
                              type="text"
                              required
                              value={Test}
                              onChange={(e)=>setTest(e.target.value)}
                              autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleEdit} style={{marginRight: 180}}>
                        Edit Question 
                </Button>
                    <Button variant="secondary" onClick={handleClose} style={{marginRight: 210}}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Question </Modal.Title>
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
export default TableQuestions;