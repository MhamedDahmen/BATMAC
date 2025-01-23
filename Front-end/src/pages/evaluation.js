import React from "react";
import {Card, Button} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import Navbarr from "../components/FrontOffice/Navbar";

function Evaluation () {

    const score = localStorage.getItem('score') ; 
    const viderCokkie =()=> {
        localStorage.removeItem('score') ; 
    }

    return (
    <div>
{/*<h2> scorek :  </h2> <p> {score} </p>
<button onClick={()=>viderCokkie()}>clear</button>*/}
 <Navbarr />
<Card className="text-center">
  <Card.Header>Evaluation</Card.Header>
  <Card.Body>
    <Card.Title> SCORE </Card.Title>
    <Card.Text>
             {score}
    </Card.Text>
    <NavLink to ={'/showDomain'}>
    <Button variant="primary" onClick={()=>viderCokkie()}>RESSAYER</Button>
    </NavLink>
  </Card.Body>
  <Card.Footer className="text-muted"></Card.Footer>
</Card>

    </div>
    );
}

export default Evaluation ; 