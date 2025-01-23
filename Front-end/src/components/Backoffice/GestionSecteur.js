import React from 'react';
import Sidebar from '../../Sidebar';
import NavbarAdmin from '../NavbarAdmin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { isEmpty } from '../../Utils';
import '../../styles/AdminTables.scss'
import '../../styles/TestQuestion.scss'
import { Modal, Form } from 'react-bootstrap';
import TableSecteur from './TableSecteur';

function GestionSecteur() {
    const [Secteur, setSecteur] = useState([]);
    const [domaines, setDomaines] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const getSecteur = () => {
        axios.get("http://127.0.0.1:8000/batmac/secteur/getSecteur").then((res) => {
            setSecteur(res.data);
            console.log(res.data);

        })
    }
    //get Domaines
    const getDomaines = () => {
        axios.get("http://127.0.0.1:8000/batmac/domaine/getDomaines").then((res) => {
            setDomaines(res.data)

        })
    }
    useEffect(() => {
        getSecteur();
        getDomaines();
    }, [])
    //add Secteur
    const [secteurTitle, setSecteurTitle] = useState("");
    const [secteurImage, setSecteurImage] = useState("");
    const [secteurDesc, setSecteurDesc] = useState("");

    const [Domaine, setDomaine] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();

        formData.append('title', secteurTitle);
        formData.append('description', secteurDesc);
        formData.append('image' , secteurImage);

        if (Domaine === "") {

            formData.append('domaine', !isEmpty(domaines) && domaines[0].title);
        }
        else {

            formData.append('domaine', Domaine);
        }

        axios.post('http://127.0.0.1:8000/batmac/secteur/add', formData).then(() => {
            setSecteurTitle("");
            setIsLoading(false);
            getSecteur();
            handleClose();
        })
    }
    //search
    const [testToSearch, setTestToSearch] = useState('');

    return (
        <div>
            <NavbarAdmin />
            <Sidebar />
            <div className="Qcontainer">
                <Button variant="primary" onClick={handleShow} style={{position: "relative", bottom: 20 , right:250}} className='btnadmin'>Add Secteur</Button>



             
                {!isEmpty(domaines) && domaines.map((domaine) =>
                    <>
                    </>
                )}



                <Table striped bordered hover variant="light"  >
                    <thead>
                        <tr>
                            
                            <th> SECTEUR</th>
                            <th> DESCRIPTION</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Secteur) && Secteur.filter(secteur => secteur.domaine?.title.includes(testToSearch)).map((secteur) =>
                            <tr>
                                <TableSecteur key={secteur.id} secteur={secteur} getSecteur={getSecteur} />

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>



            <Modal show={show}>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Add Secteur </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Form.Group>
                            <Form.Control
                                type='Text'
                                placeholder='Secteur Title *'
                                required

                                onChange={(e) => setSecteurTitle(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='Textarea'
                                placeholder='secteur Description *'
                                required

                                onChange={(e) => setSecteurDesc(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='file'
                                placeholder='Secteur image *'
                                required

                                onChange={(e) => setSecteurImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Select aria-label="Default select example" onChange={(e) => setDomaine(e.target.value)}>
                                {!isEmpty(domaines) && domaines.map((domaine) =>
                                    <>

                                        <option value={domaine.title}>{domaine.title}</option>

                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Button variant="success" type="submit" block>
                            {isLoading ? <Spinner animation="border" /> : 'Add New Secteur'}
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

export default GestionSecteur