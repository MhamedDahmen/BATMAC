import axios from "axios";
import React, { useEffect, useState } from "react";
import CompetenceCard from "../components/FrontOffice/CompetenceCard";
import '../styles/titles.css';
import { isEmpty } from "../Utils";
import '../styles/Cards.scss';
import { useParams, NavLink } from 'react-router-dom'
import { Card, Button} from "react-bootstrap";
import Navbarr from "../components/FrontOffice/Navbar";

function Competence() {
    const { idSecteur } = useParams();

    const [competences, setCompetences] = useState([]);

    const getCompetences = () => {
        axios.get(`http://127.0.0.1:8000/batmac/competance/getCompetences/${idSecteur}`).then((res) => {
            setCompetences(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getCompetences();
    }, [])

    return (
        <>


            <Navbarr />
            <center>
                <h2 className="titleD" style={{position: 'relative' , margintop :'50'}}>NOS COMPETENCES</h2>
                <br></br>
                <hr></hr>
            </center>

            


                {!isEmpty(competences) && competences.map((competence) =>
                <div className="column">
                   <Card className="card-container" style={{ width: '18rem' }}>
                   
                        <CompetenceCard key={competence.id} competence={competence} />
                    
                    
                 <NavLink to={'/tests/'+competence.id}>  
                <Button variant="primary">Go somewhere</Button>
                </NavLink>
                   
                     </Card>
                     </div>

                )}
                           
        </>


    );
}

export default Competence 