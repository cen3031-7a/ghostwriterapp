import React, {Component} from 'react'

class Login extends Component {

    constructor(){
        super()
        this.state={
            email: "",
            password: "",
            token: ""
        }
    }

    // updates a given state based on the id ex: event.target.id = "firstname", event.target.value = "Bob"
    update(event){
        this.setState({ [event.target.id]: event.target.value })
    }

    // returns the token from login to app.js to be used for auth on all routes that need it
    updateToken(token){
        this.props.updateToken(this.state.token);
    }

    // submit the login info and on return takes the token from the response and brings it app.js
    submit(event){
        event.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        fetch("/auth/Login", 
        {
            method: "POST",
            body: JSON.stringify(user),
            headers:
			{
				'Content-Type': 'application/json'
            }
        })
        .then(data => {return data.json()})
        .then(res => {this.setState({token: res.token})})
        .then(() => {this.updateToken()})
        // token on the front end
    }

    render() {
        return(
        <div>
            <form onSubmit={this.submit.bind(this)}> {/* Submit has to be in the form or will not work */}             
                <input
                id="email"
                placeholder="Email"
                type="text"
                onChange={this.update.bind(this)}/>
                
                <input
                id="password"
                placeholder="Password"
                type="password"
                onChange={this.update.bind(this)}/>

                <button type="submit"></button>
            </form>
        </div>
        )
    }
}

export default Login;