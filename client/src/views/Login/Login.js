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

    update(event){
        this.setState({ [event.target.id]: event.target.value })
    }

    updateToken(token){
        this.props.updateToken(this.state.token);
        // call app.js version of this function
    }

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
            <form onSubmit={this.submit.bind(this)}>                
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