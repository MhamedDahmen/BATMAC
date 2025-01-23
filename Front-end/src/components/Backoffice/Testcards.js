import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form, Spinner } from 'react-bootstrap'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
const TestCards = ({ test, getTests }) => {

    const [title, setTitle] = useState(test.title);
    const [testDesc, setTestDesc] = useState(test.description);
    const [testObjectif, setTestObjectif] = useState(test.objectif);
    const [competence, setCompetence] = useState(test.competence?.title);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
  

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete =()=> {
        setShowDelete(true);
    }

    //editTest 

    const handleEdit = () => {
        // e.preventDefault() ; 
        setIsLoading(true);

        const data = {
            title: title,
            description : testDesc,
            objectif: testObjectif,
            competence: competence
        }


        axios.put(`http://127.0.0.1:8000/batmac/test/update/${test.id}`, data).then(() => {

            setIsLoading(false);
            getTests();
            handleClose();
        })


    }

    //delete 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/batmac/test/delete/${test.id}`).then(() => {
            getTests();
            handleClose();
        })
    }

    return (
        <>




            
            <td>{test.title}</td>
            <td>{test.description}</td>
            <td>{test.objectif}</td>
            <td>
                        <EditOutlined onClick={handleShow} />
                        <DeleteOutlined onClick={handleShowDelete} />

            </td>

            <Modal show={show}  >
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Edit Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group>
                        <Form.Control
                            type='Text'
                            placeholder='Test Name *'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Control
                            type='Text'
                            placeholder='Test Description *'
                            required
                            value={testDesc}
                            onChange={(e) => setTestDesc(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Control
                            type='Text'
                            placeholder='Test Objectif *'
                            required
                            value={testObjectif}
                            onChange={(e) => setTestObjectif(e.target.value)}
                        />
                    </Form.Group>
                     <br></br>
                    <Form.Group>
                        <Form.Control
                            type='Text'
                            placeholder='competence ID *'
                            required
                            value={competence}
                            onChange={(e) => setCompetence(e.target.value)}

                        />
                    </Form.Group>

                    <Button variant="success" type="submit" block onClick={() => handleEdit()} style={{marginRight: 250}} >
                        {isLoading ? <Spinner animation="border" /> : "Edit"}

                    </Button>

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}> close</button>
                </Modal.Footer>
            </Modal>




            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Test </Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Deletion</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete} style={{marginRight: 180}} >
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete} style={{marginRight: 210}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>



        
    );
}


export default TestCards;