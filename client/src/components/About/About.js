import React, {Component} from 'react';
import  './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component{
    render(){
        return(
            <div className="about-box">
                <h3 className="about-title">About Us</h3>
                    <p className="about-body">
                        If you’ve been dreaming about writing your life story, dream no more—Ghostwriter makes it easy for anyone to write a book about their life, even if you have no professional writing experience. 
                        <br></br><br></br>
                        With Ghostwriter, you can say goodbye to writer’s block or wondering what to write about next.  Just sign up for a free account and open the easy-to-use web app.  Next, choose the topics you’d like to write about—from your childhood to your travels to your family and professional life. 
                        <br></br><br></br>
                        To guide you through your writing, Ghostwriter asks you a set of questions about each topic you’ve chosen.  All you have to do is answer the questions in the text boxes provided—Ghostwriter even gives you helpful tips on writing, ways to spark old memories, and ways to stay motivated as you write.
                        <br></br><br></br>
                        And don’t worry if you can’t finish your story in one sitting—Ghostwriter automatically saves your story, so you can pick up where you left off at any time.
                        <br></br><br></br>
                        When you’re done, just print out your story so you can share it with your friends and family. It’s just that simple.
                        <br></br><br></br>
                        Your story and life lessons are too important to go untold.  Sign up for Ghostwriter now so you too can make your book a reality.
                    </p>
            </div>
        )
    }
}

export default Login;