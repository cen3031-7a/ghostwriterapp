import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: " ",
            firstname: " ",
            lastname: " ",
            password: " ",
            confirm_password: " ",
        }
    }

    change(event){
        this.setState({
            [event.target.name]: [event.target.value]
        })
        console.log(event.target.name + " " + event.target.value)
    }

    submit(){
        console.log(this.state);
    }

    render() {
		
		return(
            <div className = "Register">
                <h2>Sign up</h2>
                <form>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email" 
                        val = {this.state.email}
                        onChange = {this.change.bind(this)}
                    />
                    <input
                    type="text"
                    name="firstname" 
                    placeholder="First Name"
                    val = {this.state.firstname}
                    onChange = {this.change.bind(this)}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name" 
                        val = {this.state.lastname}
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
                        type="password"
                        name="confirm_password"
                        placeholder="Retype your password" 
                        val = {this.state.confirm_password}
                        onChange = {this.change.bind(this)}
                    />
                    <input
                        type="submit"
                        onClick={this.submit.bind(this)}
                    />
                </form>
                <p>Already have an account with us? <a href="/Login">Sign in</a></p>
            </div>
        );
    }
}


export default Register;