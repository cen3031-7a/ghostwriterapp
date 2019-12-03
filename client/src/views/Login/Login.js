import React, {Component} from 'react'

class Login extends Component {

    constructor(){
        super()
        this.state={
            email: "",
            password: ""
        }
    }

    update(event){
        this.setState({ [event.target.id]: event.target.value })
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
        .then(function(res){return res})
        .then(function(body){console.log(body)})
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