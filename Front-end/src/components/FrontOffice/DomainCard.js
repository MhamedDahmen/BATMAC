import React from "react";
import '../../styles/Cards.scss';
import {Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


function DomainCard({ domaine }) {




  return (




    <>  
      <div className="image-container">
        <NavLink to={'/showSecteur/'+domaine.id}>
       <img src={domaine.image} />
       </NavLink>
       </div>
      <Card.Body className="card-content">
        <Card.Title className="card-title">
          {domaine.title}

        </Card.Title>
        <Card.Text className="card-body">
          {domaine.description}
        </Card.Text>
      </Card.Body>
    </>
  )
}

export default DomainCard; 