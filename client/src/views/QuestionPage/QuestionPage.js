import React, {Component} from 'react';
import  './QuestionPage.css';
import Dashboard from '../../components/Dashboard/Dashboard'

class QuestionPage extends Component {
	
	constructor() {
	 
		super();
		this.state = {text: ''};

	}
	
	qPage = (text) =>
	{
		this.setState({text: text.text});
		//console.log(this.state);
	}
	
    render() {
		
		return(
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > HELLO </div>
				
				<div style={{width: '20%', float: 'left'}}> <p></p>  </div>
				
				<div className="Dashboard">
				<Dashboard data={this.props.data} callbackQPage={this.qPage}/>
				</div>
				
				<div style={{width: '20%'}}>  </div>
				
			</div>

		);
		
    }
  
}


export default QuestionPage;
