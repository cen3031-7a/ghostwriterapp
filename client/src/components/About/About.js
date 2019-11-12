import React, {Component} from 'react';
import  './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends Component{
    render(){
        return(
            <div className="about-box">
                <h3 className="about-title">About Us</h3>
                    <p className="about-body">This app helps people develop books. The business owner is a Ghost Writer 
                    and frequently works with people to write memoirs. She is looking to make her business more scalable 
                    by automating the initial capture of people’s ideas through a wizard that walks the user through a 
                    number of prompts. This  will decrease the cost of having a memoir written and can help them have a 
                    first draft of a book faster. If people are interested in a more polished draft they can subscribe 
                    to the premium version of the app which gets them time with the business owner to polish the draft 
                    to publishable quality in less time.
                    </p>
            </div>
        )
    }
}

export default About;