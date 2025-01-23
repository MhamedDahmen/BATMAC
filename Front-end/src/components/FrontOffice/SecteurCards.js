import React from "react";
import { Card, Button } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import '../../styles/Cards.scss';

function SecteurCards({ secteur }) {




  return (


    <> 
        <div className="image-container">
        <NavLink to={'/showCompetence/' + secteur.id}>
        <img src={secteur.image} />
        </NavLink>
         </div>
      <Card.Body className="card-content">
        <Card.Title className="card-title">
          {secteur.title}

        </Card.Title>
        <Card.Text className="card-body">
          {secteur.description}
        </Card.Text>
        
      </Card.Body>
                   
    </>



  )
}

export default SecteurCards; 