import React from 'react';
import Sidebar from '../../Sidebar';
import NavbarAdmin from '../NavbarAdmin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { isEmpty } from '../../Utils';
import '../../styles/AdminTables.scss'
import { Modal, Form } from 'react-bootstrap';
import DomainTable from './DomainTable';

function GestionDomains() {
    const [Domain, setDomain] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const getDomaines = () => {
        axios.get("http://127.0.0.1:8000/batmac/domaine/getDomaines").then((res) => {
            setDomain(res.data);
            console.log(res.data);

        })
    }
    
    useEffect(() => {
        getDomaines();
    }, [])
    //add Domaine
    const [DomaineTitle, setDomaineTitle] = useState("");
    const [domainImage, setDomaineImage] = useState("");
    const [domainDescription, setDomainDescription]=useState("")
    


    const handleSubmit = (e) => {
        e.preventDefault();
         setIsLoading(true);
         const formData = new FormData
         formData.append('title', DomaineTitle);
         formData.append('description', domainDescription);
         formData.append('image', domainImage);
         
        axios.post(`http://127.0.0.1:8000/batmac/domaine/post`, formData).then(() => {
                setDomaineTitle("");
                setDomaineImage("");
                setDomainDescription("");
                setIsLoading(false);
                getDomaines();
                handleClose();
            })
    }

    return (
        <div>
            <NavbarAdmin />
            <Sidebar />
            <div className="Qcontainer">
                <Button variant="primary" onClick={handleShow} style={{ position: "relative",bottom: 20 , right:250 }}>Add Domaine</Button>
                <Table striped bordered hover variant="light"  >
                    <thead>
                        <tr>
                            
                            <th>DOMAINES</th>
                            <th>DESCRIPTION</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(Domain) && Domain.map((domain) =>
                            <tr>
                                <DomainTable key={domain.id} domain={domain} getDomain={getDomaines} />

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>



            <Modal show={show}>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Add Domain </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Form.Group>
                            <Form.Control
                                type='Text'
                                placeholder='Domain Title *'
                                required

                                onChange={(e) => setDomaineTitle(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='Textarea'
                                placeholder='Domain Description *'
                                required

                                onChange={(e) =>setDomainDescription(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type='file'
                                placeholder='Domain image *'
                                required

                                onChange={(e) => setDomaineImage(e.target.files[0])}
                            />
                        </Form.Group>
                       <br />

                        <Button variant="success" type="submit" block>
                            {isLoading ?<Spinner animation="border" /> : 'Add New Domain' }</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default GestionDomains