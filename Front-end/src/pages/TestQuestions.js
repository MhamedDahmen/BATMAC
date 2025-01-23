import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { isEmpty } from "../Utils";

import '../styles/questions.scss';
import Navbar from "../components/FrontOffice/Navbar";

import { Steps, Button} from 'antd';

const { Step } = Steps;


function TestQuestions() {

    const { idTest } = useParams();
    const [questions, setQuestions] = useState([]);
    const [nextQuestion, setNextQuestion] = useState(1);

    // const [steps,setSteps] = useState([]) ; 
    const getQuestions = () => {
        axios.get(`http://127.0.0.1:8000/batmac/test/getQuestions/${idTest}`).then((res) => {
            setQuestions(res.data);


        })
    }

    useEffect(() => {
        getQuestions();


    }, [])


    //getChoices 



    const [score, setScore] = useState(0);



    const getChoices = (value, question) => {

        for (let i = 0; i < questions?.length; i++) {

            if (questions[i].question === question.question) {
                if (value === questions[i].solution) {
                    setScore(score + 1);
                }
                else {
                    setScore(score - 1);
                }
            }


        }

        console.log(value);
        console.log(question);
        console.log(score);
    }




    const evaluate = () => {
        console.log(score);
        localStorage.setItem('score', score);

    }







    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        
        <>
       <Navbar />
            
           {/* <Steps current={current}>
                {!isEmpty(questions) && questions.map((item) => (

                    <Step key={item.question} title={item.question} />


                ))}
            </Steps>

          

                {!isEmpty(questions) && questions[current].choix.map((choice) =>


                    <>

                        <input type="radio" id="huey" name="raff" value={choice.choix} 
                            onChange={(e) => getChoices(e.target.value, questions[current])} />
                        
                        <label for="huey"> {choice.choix} </label>

                    </>

                )}

          






            <div className="steps-action">
                {current < questions.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === questions.length - 1 && (
                    <Button type="primary" onClick={() => evaluate()}>
                        Done
                    </Button>
                )}

            </div>*/}

                <>
                <div className="ques-container">
                
            <ul >
            
                {!isEmpty(questions) && questions.slice(0,nextQuestion)
                    
                    .map((question) =>
                        <>
                        
                            <h4 style={{marginTop:15}}> <center> 1. {question.question} </center></h4>
                            {question.choix.map((choice) =>

                                 
                                <div style={{marginLeft:75, marginTop:15}}>
                                    <li className="list">
                                <input type="radio" id="huey" name="drone" value={choice.choix}
                                     onChange={(e) =>getChoices(e.target.value,question) } />
                                <label for="huey">{choice.choix}</label>
                                
                                   </li>
                                   </div>
                                   
                            )}

                        
                    
                        </>
                    )}



            </ul>  
            
            {!isEmpty(questions)&&questions.length+1 > nextQuestion ?                       
            <Button style={{marginLeft:250}} type='primary' onClick={() => setNextQuestion(nextQuestion + 1)}>
                Next
            </Button>
            
 : 
            <NavLink to='/evaluation' >
                <Button onClick={() => evaluate()} >
                    Evaluate
                </Button>
            </NavLink>
}
            
            </div>
            
           
            </>












        </>
        




    )
}

export default TestQuestions; 