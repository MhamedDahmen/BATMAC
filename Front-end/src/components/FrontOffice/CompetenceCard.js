import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function CompetenceCard ({competence}) {
  
  
  
  
  return (<>
         <div className="image-container">
         <NavLink to={'/tests/' + competence.id}>
            <img src={competence.image} />
          </NavLink>
        </div>
      <Card.Body className="card-content">
        <Card.Title className="card-title">
          {competence.title}

        </Card.Title>
        <Card.Text>
          {competence.description}
        </Card.Text>
      </Card.Body>
        


    </>)
}

export default CompetenceCard ; 