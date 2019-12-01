import { React, Component} from 'react'

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

        fetch("/Login", 
        {
            method: "POST",
            body: JSON.stringify(user),
            headers:
			{
				'Content-Type': 'application/json'
            }
        })
        .then(res => res.status(200).redirect("/Questions"))

        // token on the front end
    }

    render() {
        return(
        <div>
            <form>                
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

                <button type="submit" onSubmit={this.submit.bind(this)}></button>
            </form>
        </div>
        )
    }
}

export default Login;