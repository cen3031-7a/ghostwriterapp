import React, {Component} from 'react';
import  './QuestionPage.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionPage extends Component {
	
	constructor() {
	 
		super();
		this.state = 
		{
			text: '',
			block: []
		};

	}
	
	qPage = (restext) =>
	{
		this.setState({text: restext});
		this.props.response(restext);
	}
	
	secOrder = (order) => 
	{
		this.props.secOrder(order);
	}
	
    render() {

		return(
		
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > Toolbar </div>
				
				<div style={{width: '20%', float: 'left'}}> <p></p>  </div>
				
				<div className="Dashboard">
					<Dashboard data={this.props.questions} resData={this.props.resData} callbackQPage={this.qPage} callbackOrder={this.secOrder}/>
				</div>
				
				<div style={{width: '20%'}}>  </div>
				
			</div>

		);
		
    }
  
}


export default QuestionPage;
