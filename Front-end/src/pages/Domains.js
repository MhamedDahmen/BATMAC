import axios from "axios";
import React, { useEffect, useState } from "react";
import DomainCard from "../components/FrontOffice/DomainCard";

import {Button, Card} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/Cards.scss';
import '../styles/titles.css';
import { isEmpty } from "../Utils";
import Navbar from "../components/FrontOffice/Navbar";


function Domains() {

    const [Domaines, setDomaines] = useState([]);

    const getDomaines = () => {
        axios.get('http://127.0.0.1:8000/batmac/domaine/getDomaines').then((res) => {
            setDomaines(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getDomaines();
        console.log(Domaines.image)
    }, [])

    return (
        <>


            <Navbar />
            <center>
                <h2 className="titleD" style={{position: 'relative' , margintop :'50'}}>NOS DOMAINES</h2>
                <br></br>
                <hr style={{left: 100, right:100}} ></hr>
            </center>
           
                    
            {!isEmpty(Domaines) && Domaines.map((domaine) =>
                     <div className="column" >
                            <Card className="card-container" style={{ width: '18rem' }}>
                            <DomainCard key={domaine.id} domaine={domaine} />
                            <br></br>
                           
                            </Card>
                            </div>
            )}     
          

        </>


    );
}

export default Domains 