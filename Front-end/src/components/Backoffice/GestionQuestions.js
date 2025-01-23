import React from 'react';
import Sidebar from '../../Sidebar';
import NavbarAdmin from '../NavbarAdmin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Table, Button, Spinner} from 'react-bootstrap';
import { isEmpty } from '../../Utils';
import TableQuestions from './TableQuestions';
import '../../styles/AdminTables.scss'
import { Modal , Form} from 'react-bootstrap';


function GestionQuestions() {
    const [question, setQuestion]= useState([]);
    const[Tests, setTests]= useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

   const handleShow = ()=>{
        setShow(true);
    }
    const handleClose= ()=>{
        setShow(false);
    }
    const getQuestion = ()=>
    {
        axios.get("http://127.0.0.1:8000/batmac/questions/getQuestions").then((res)=>{
            setQuestion (res.data);
            console.log(res.data);

        })
    }
       //get tests
         const getTests =()=> {
             axios.get("http://127.0.0.1:8000/batmac/test/getTests").then((res)=>{
                 setTests(res.data)
             })
         }
     useEffect(() => {
         getQuestion();
         getTests();
     }, [])
     //add question
     const [questionContent, setQuestionContent] = useState("");
     const [solution, setSolution] = useState("");
     const [Test, setTest] = useState("");


      const handleSubmit =(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData() ; 
         
        formData.append('question',questionContent) ; 
        formData.append('solution',solution) ; 
        
        if(Test === "")
               {

                     formData.append('test',!isEmpty(Tests)&&Tests[0].title) ;   
               }
           else {
               
               formData.append('test',Test) ;
           }
       
            axios.post('http://127.0.0.1:8000/batmac/questions/post',formData).then(() => {
                    setQuestionContent("");
                    setSolution("");
                    setIsLoading(false);
                    getQuestion();
                    handleClose() ;     
                })
      }
     //search
     const [testToSearch,setTestToSearch] = useState('') ; 
  return (
    <div>
        <NavbarAdmin />
        <Sidebar/>
        
        <div className="Qcontainer">
        
        <Button variant="primary" onClick={handleShow} style={{position:"relative",bottom: 20 , right:250}}>Add Question</Button>
        
            {!isEmpty(Tests)&&Tests.map((tst )=>
            <> 
            
               </>
            )}
        
        <Table striped bordered hover variant="light"  >
                    <thead>
                        <tr>
                            <th> ID</th>
                            <th> QUESTION</th>
                            <th> SOLUTION</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(question) && question
                        .filter(question=>question.test?.title.includes(testToSearch))
                        .map((question) =>
                        
                            <tr>
                                <TableQuestions key={question.id} question={question} getQuestionT={getQuestion} />

                            </tr>
                        )}
                    </tbody>
                </Table> 
                
        </div>



              <Modal show={show}>
              <Modal.Header closeButton onHide={handleClose}>
                        <Modal.Title>Add Question </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => handleSubmit(e)} >
                            <Form.Group>
                                <Form.Control
                                    type='Text'
                                    placeholder='Question Content *'
                                    required
                                    
                                    onChange={(e) =>  setQuestionContent(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group>
                                <Form.Control
                                    type='Text'
                                    placeholder='Solution *'
                                    required
                                    
                                    onChange={(e) => setSolution(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group>
                                <Form.Select aria-label="Default select example" onChange={(e) => setTest(e.target.value)}>
                                    {!isEmpty(Tests) && Tests.map((test) =>
                                        <>

                                            <option value={test.title}>{test.title}</option>

                                        </>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <br></br>
                            <Button variant="success" type="submit" block> 
                            {isLoading ? <Spinner animation="border" />: ' Add New Question' }
                             </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleClose}>Close</button>
                    </Modal.Footer>
              </Modal>
              
    </div>
  )
}

export default GestionQuestions