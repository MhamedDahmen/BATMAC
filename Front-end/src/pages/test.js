import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import DateTime from '../components/FrontOffice/DateTime';
import Navbarr from '../components/FrontOffice/Navbar';

import '../styles/test.scss';
import { isEmpty } from '../Utils';


function Test() {

    const { idCompetence } = useParams();

    const [Test, setTest] = useState();
    const [rdv, setRdv] = useState(false);


    setTimeout(function(){
        setRdv(true); 
   }, 60000 );//wait 2 seconds

    const getTest = () => {
        axios.get(`http://127.0.0.1:8000/batmac/test/getAleatoire/${idCompetence}`).then((res) => {
            setTest(res.data);
            console.log(res.data);
        })

    }


    useEffect(() => {
        getTest();
    }, [])
    


    return (


        <>
        <Navbarr/>

            <Card className='test-container'>
                <Card.Header className='header'><center><h2>  TEST</h2>
                <hr></hr></center>
                </Card.Header>
                {!isEmpty (Test) &&
                <center>
                <Card.Body>
                    <Card.Title><p> {Test[0].title} </p></Card.Title>
                    <Card.Text>
                    <p> {Test[0].description} </p>
                    </Card.Text>
                    <Card.Text>
                    <p> {Test[0].objectif} </p>
                    </Card.Text>
                    <Card.Text>
                       <DateTime/>
                    </Card.Text>
                    { rdv ? 
                    <Button variant="light"><a href={'questions/' + Test[0].id}>Passer au Test</a></Button> :
                    <Button variant="light"><a href='' >Demander un RDV</a></Button>
                    }
                </Card.Body>
                </center>
                }
            </Card>




           
           



        </>

    )
        ;
}

export default Test; 