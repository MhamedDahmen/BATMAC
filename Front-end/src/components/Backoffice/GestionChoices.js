import React from 'react';
import Sidebar from '../../Sidebar';
import NavbarAdmin from '../NavbarAdmin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Spinner} from 'react-bootstrap';
import { isEmpty } from '../../Utils';
import TableChoices from './TableChoices';
import '../../styles/AdminTables.scss'
import { Modal, Form } from 'react-bootstrap';


function GestionChoices() {
    const [Choice, setChoice] = useState([]);
    const [Question, setQuestions]=useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const getChoices = () => {
        axios.get("http://127.0.0.1:8000/batmac/choices/getChoices").then((res) => {
            setChoice(res.data);
            console.log(res.data);

        })
    }
    //get Questions
    const getQuestions = () => {
        axios.get("http://127.0.0.1:8000/batmac/questions/getQuestions").then((res) => {
            setQuestions(res.data)
        })
    }
    useEffect(() => {
        getChoices();
        getQuestions();
    }, [])
    //add Choice
    const [ChoiceContent, setChoiceContent] = useState("");
    const [question, setQuestion] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData() ; 
         
        formData.append('choix',ChoiceContent) ; 
       
        
        if(question === "")
               {

                     formData.append('question',!isEmpty(Question)&&Question[0].question) ;   
               }
           else {
               
               formData.append('question',question) ;
           }

        axios.post(`http://127.0.0.1:8000/batmac/choices/post`,formData).then(() => {
                setChoiceContent("");
                setIsLoading(false);
                getChoices();
                handleClose();
            })
    }

    return (
        <div>
            <NavbarAdmin />
            <Sidebar />
            <div className="Qcontainer">
                <Button variant="primary" onClick={handleShow} style={{ position: "relative", bottom: 20 , right:250 }}>Add Choice</Button>
                <Table striped bordered hover variant="light"  >
                    <thead>
                        <tr>
                            <th> ID</th>
                            <th> CHOICES</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Choice) && Choice.map((choix) =>
                            <tr>
                                <TableChoices key={choix.id} choix={choix} getQuestionC={getQuestions} />

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>



            <Modal show={show}>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Add Choice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Form.Group>
                            <Form.Control
                                type='Text'
                                placeholder='Choice *'
                                required
                                value={ChoiceContent}
                                onChange={(e) => setChoiceContent(e.target.value)}
                            />
                        </Form.Group>
                       <br />
                        <Form.Group>
                            <Form.Select aria-label="Default select example" onChange={(e) => setQuestion(e.target.value)}>
                                {!isEmpty(Question) && Question.map((question) =>
                                    <>

                                        <option value={question.question}>{question.question}</option>

                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Button variant="success" type="submit" block>
                             {isLoading ? <Spinner animation="border"/> :'Add New Choice' } </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GestionChoices