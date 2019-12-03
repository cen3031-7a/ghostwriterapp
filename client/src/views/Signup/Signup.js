import React, {Component} from 'react'

class Signup extends Component {

    constructor(){
        super()
        this.state={
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    }

    update(event){
        this.setState({ [event.target.id]: event.target.value })
    }

    submit(event){
        event.preventDefault()

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }

        fetch('/auth/Signup', 
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{'Content-Type': 'application/json'}
        })
        .then(function(res){return res})
        .then(function(body){console.log(body)})
    }

    render() {
        return(
        <div>
            <form onSubmit={this.submit.bind(this)}>
                <input
                id="firstname"
                placeholder="First Name"
                type="text"
                onChange={this.update.bind(this)}/>

                <input
                id="lastname"
                placeholder="Last Name"
                type="text"
                onChange={this.update.bind(this)}/>
                
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

                <input
                id="confirm_password"
                placeholder="Confirm Password"
                type="password"
                onChange={this.update.bind(this)}/>

                <button type="submit"></button>
            </form>
        </div>
        )
    }
}

export default Signup;