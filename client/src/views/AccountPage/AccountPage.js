import React, {Component} from 'react';
import  './AccountPage.css';

class AccountPage extends Component{

    constructor(props) {

		super(props);
		this.state = 
		{	
            uInfo: '',
            first: '',
            last: '',
            email: '',
            age: 0,
            accType: ''		 
		};
    }
    
    componentDidMount() {
		
        this.getUserAcc();
    
      }

getUserAcc = () => {
    fetch('/api/users/info')
    .then((uInfo) => uInfo.json())
    .then((res) => this.setState(
        {
        first: res.firstname, 
        last: res.lastname, 
        email: res.email,
        age: res.age, 
        accType: res.accounttype
         }
         ))
}

    render(){
        return(
            <div className="acc-box">
                <h2 className="acc-title">My Account</h2>
                <div className="acc-body">
                    Account Email: {this.state.email}
                </div>
                    &nbsp;
                <div className="acc-body">
                    Name: {this.state.first} {this.state.last}
                </div>
                &nbsp;
                <div className="acc-body"> 
                    Age: {this.state.age}
                </div>
                &nbsp;
                <div className="acc-body">
                    Account Type: {this.state.accType} 
                </div>
            </div>
        )
    }
}

export default AccountPage