import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablesCompetences from './TablesCompetences';
import { isEmpty } from '../../Utils';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap'
import NavbarAdmin from '../NavbarAdmin';
import Sidebar from '../../Sidebar';
import '../../styles/AdminTables.scss';



const BackCompetences = () => {
    const [Competences, setCompetences] = useState([]);
    const [Secteur, setSecteur] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const getCompetences = () => {
        axios.get('http://127.0.0.1:8000/batmac/competance/getCompetences').then((res) => {
            setCompetences(res.data);
            console.log(res.data);
        })
    }

    const getSecteurs = () => {
        axios.get('http://127.0.0.1:8000/batmac/secteur/getSecteur').then((res) => {
            setSecteur(res.data);
            console.log(res.data)
        })
    }

    useEffect(() => {
        getCompetences();
        getSecteurs();
    }, [])

    //addCompetence
    const [competenceTitle, setCompetenceTitle] = useState("");
    const [compImage, setCompImage] = useState("");
    const [compDesc, setCompDesc] = useState("") ;
    const [secteurs, setSecteurs] = useState("");

    const handleSubmit =(e)=>{
        e.preventDefault();
        setIsLoading(true);
             
         const formData = new FormData() ; 
         
         formData.append('title',competenceTitle) ; 
         formData.append('description',compDesc) ; 
         formData.append('image',compImage) ; 
         
         if(secteurs === "")
                {

                      formData.append('secteur',!isEmpty(Secteur)&&Secteur[0].title) ;   
                }
            else {
                
                formData.append('secteur',secteurs) ;
            }



            // const data = {
            //     title: competenceTitle ,
            //     secteur:  secteurs 
            // }
            

            axios.post('http://127.0.0.1:8000/batmac/competance/post',formData).then(() => {
                    
                    setCompetenceTitle("");
                    getCompetences();
                    setIsLoading(false)
                    handleClose() ;     
                })
      }
        //search
  const [testToSearch,setTestToSearch] = useState('') ; 



    return (
        <>


            <NavbarAdmin />
            <Sidebar />
            <div className="Qcontainer">
                <Button variant="primary" onClick={handleShow} style={{ position: "relative", bottom: 20 , right:250 }}>Add Competence</Button>
               
            {!isEmpty(Secteur)&&Secteur.map((secteur )=>
            <> 
            
               </>
            )}
                <Table striped bordered hover variant='light' >

                    <thead>
                        <tr>
                            
                            <th>COMPETENCES</th>
                            <th>DESCRIPTION</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Competences) && Competences.filter(competence=>competence.secteur?.title.includes(testToSearch)).map((competence) =>
                            <tr>
                                <TablesCompetences key={competence.id} competence={competence} getCompetence={getCompetences} />
                            </tr>

                        )}
                    </tbody>

                </Table>
            </div>
            <Modal show={show}>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Add Competence </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Form.Group>
                            <Form.Control
                                type='Text'
                                placeholder='competence Title *'
                                required

                                onChange={(e) => setCompetenceTitle(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='Text'
                                placeholder='competence Description *'
                                required

                                onChange={(e) => setCompDesc(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='file'
                                placeholder='competence Image *'
                                required

                                onChange={(e) => setCompImage(e.target.files[0])}
                            />
                        </Form.Group>
                          <br></br>
                        <Form.Group>
                            <Form.Select aria-label="Default select example"  onChange={(e) =>setSecteurs(e.target.value)}>
                                {!isEmpty(Secteur) && Secteur.map((secteur) =>
                                    <>

                                        <option value={secteur.title}>{secteur.title}</option>

                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" type="submit" block>
                             {isLoading ? <Spinner animation="border" /> : 'Add New Competence'}
                         </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>





        </>


    );
}

export default BackCompetences;