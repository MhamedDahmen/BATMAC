import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../NavbarAdmin';
import { Button, Table,Spinner } from 'react-bootstrap';
import TestCards from './Testcards';
import { isEmpty } from '../../Utils';
import Sidebar from '../../Sidebar';
import { Modal ,Form} from 'react-bootstrap';
import '../../styles/AdminTables.scss' ; 

const Tests = () => {
    {
        const [Tests, setTests] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const getTests = () => {
            axios.get(`http://127.0.0.1:8000/batmac/test/getTests`).then((res) => {
                setTests(res.data);
                console.log(res.data)
            }
            )
        }

        //getCompetences 
        const [competences, setCompetences] = useState([]);
        const getCompetences = () => {
            axios.get('http://127.0.0.1:8000/batmac/competance/getCompetences').then((res) => {
                setCompetences(res.data);
            })
        }
        useEffect(() => {
            getTests();
            getCompetences();

        }, [])

        const [show, setShow] = useState(false);
        const handleShow = () => {
            setShow(true);
        }
        const handleClose = () => setShow(false);



        //addTest
        const [Title, setTitle] = useState("");
        const [CompId, setCompId] = useState("");
        const [testDesc, setTestDesc] = useState("");
        const [testObjectif, setTestObjectif] = useState("");
        const [error, setError] = useState(false);



        const handleSubmit = (e) => {
            e.preventDefault();
            setIsLoading(true);
            const formData = new FormData() ; 
         
            formData.append('title',Title) ; 
            formData.append ('description', testDesc);
            formData.append ('objectif', testObjectif); 
            
            if(CompId === "")
                   {
   
                         formData.append('competence',!isEmpty(competences)&&competences[0].title) ;   
                   }
               else {
                   
                   formData.append('competence',CompId) ;
               }
            if (Title.length === 0) {
                setError(true);
            } else {
                axios.post(`http://127.0.0.1:8000/batmac/test/post`, formData).then(() => {
                        setError(false);
                        setTitle("");
                        setIsLoading(false);
                        setCompId("");
                        getTests();
                        handleClose() ;     
                    })
            }
        }







        return (
            <>

                <NavbarAdmin />
                <Sidebar />
                <div className="Qcontainer">   
                 <Button onClick={handleShow}  style={{position:"relative",bottom: 20 , right:250}}> Add Test</Button>
                
                 <Table  variant="light" >
                    <thead>
                        <tr>
                            
                            <th> TESTS</th>
                            <th> DESCRIPTION</th>
                            <th> OBJECTIF</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Tests) && Tests.map((test) =>
                            <tr>
                                <TestCards key={test.id} test={test} getTests={getTests} />

                            </tr>
                        )}
                    </tbody>
                </Table> 
                </div>
               
               
               
               
                <Modal show={show}>
                    <Modal.Header closeButton onHide={handleClose}>
                        <Modal.Title>Add Test</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => handleSubmit(e)} >
                            <Form.Group>
                                <Form.Control
                                    type='Text'
                                    placeholder='Test Name *'
                                    required
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group>
                                <Form.Control
                                    type='Text'
                                    placeholder='Test Desc *'
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
                                <Form.Select aria-label="Default select example" onChange={(e) => setCompId(e.target.value)}>
                                    {!isEmpty(competences) && competences.map((comp) =>
                                        <>

                                            <option value={comp.title}>{comp.title}</option>

                                        </>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <br></br>
                            <Button variant="success" type="submit" style={{right : 200}} >
                                 {isLoading? <Spinner animation="border"/> : "Add new Test"}
                                  </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleClose}> Close</button>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}

export default Tests;