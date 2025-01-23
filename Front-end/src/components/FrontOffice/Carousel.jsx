import React from 'react'
import {Carousel} from 'react-bootstrap';
import web from './images/web.png'
import rsi from './images/quiz.png'
import bigdata from './images/bigdata.jpg'
import { Button } from 'antd';

function Banner() {
    return (
        <Carousel >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={web}
                    height="500"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3> 
                    <p style={{color:"black",fontSize:30}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={bigdata}
                    height="500"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p  style={{color:"black",fontSize:30}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={rsi}
                    height="500"
                    width="400"
                    alt="Third slide"
                    
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p  style={{color:"black",fontSize:30}}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        <Button type="primary"> Get Started </Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Banner