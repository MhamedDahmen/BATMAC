import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SecteurCards from "../components/FrontOffice/SecteurCards";
import Navbar from "../components/FrontOffice/Navbar";
import { isEmpty } from "../Utils";
import '../styles/Cards.scss';
import '../styles/titles.css'
import { Button, Card } from 'react-bootstrap';

function Secteurs() {

    const { idDomain } = useParams();

    const [Secteur, setSecteur] = useState([]);

    const getSecteurs = () => {
        axios.get(`http://127.0.0.1:8000/batmac/secteur/getSecteurs/${idDomain}`).then((res) => {
            setSecteur(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getSecteurs();
    }, [])

    return (
        <>


            <Navbar />
            <center>
                <h2 className="titleD" style={{position: 'relative' , margintop :'50'}}>NOS SECTEURS</h2>
                <br></br>
                <hr style={{left: 100, right:100}} ></hr>
            </center>

            {!isEmpty(Secteur) && Secteur.map((secteur) =>
                <div className="column">
                    <Card className="card-container" style={{ width: '18rem' }}>
                        
                            <SecteurCards key={secteur.id} secteur={secteur} />
                            
                           
                        
                    </Card>
                </div>


            )}



        </>


    );
}

export default Secteurs