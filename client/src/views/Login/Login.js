import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: " ",
            password: " "
        }
    }

    change(event){
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }

    submit(){
        fetch('/Login', {
            method: 'POST',
            body: 
                JSON.stringify(
                    {
                        email: this.state.email,
                        password: this.state.password
                    }),
            headers: 
            {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){
            console.log(response);  
            return response
        })
    }
    render() {
		
		return(
            <div className = "Login">
                <h2>Login</h2>
                <form>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        val = {this.state.email}
                        onChange = {this.change.bind(this)}
                    />
                    <input
                        type="password"
                        name="password" 
                        placeholder="Password"
                        val = {this.state.password}
                        onChange = {this.change.bind(this)}
                    />
                    <input
                        type="button"
                        label="Sign up"
                        onClick={this.submit.bind(this)}
                    />
                </form>
                <div>
                    <Button
                        tag={Link}
                        to="http://localhost:5000/auth/google">
                        Sign in with Google
                    </Button>
                    <Button 
                        tag={Link}
                        to="http://localhost:5000/auth/facebook">
                        Sign in with Facebook
                    </Button>
                </div>
                <p>Dont have an account with us? <a href="/Register">Sign up</a></p>
            </div>
        );
    }
}


export default Login;