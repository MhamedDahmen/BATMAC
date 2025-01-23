import React, { useState } from 'react';
const Question = ({question}) => {
     











    return(
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="mb-5">{question.question}</h2>
              <div className="control" >
                {question.choix.map((choix, i) => (
                  <label className="radio has-background-light" key={i}>
                    <input type="radio" name="answer" value={choix} />
                    {choix}
                  </label>
                ))}
              </div>
               && <div className="has-text-danger"></div>
              <button className="button is-link is-medium is-fullwidth mt-4" >Next</button>
            </div>
          </div>
        </div>
      );
    
};

export default Question ; 
