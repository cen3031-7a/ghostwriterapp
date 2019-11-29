import React, {Component} from 'react';
import  './QuestionPage.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import Toolbar from '../../components/Toolbar/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionPage extends Component {
	
	constructor(props) {
	 
		super(props);
		this.state = 
		{
			text: '',
			block: [],
			selectedSections: this.props.resData.map((id) => {
				return id.sectionid;
			})
		};

	}
	
	qPage = (restext) =>
	{
		this.setState({text: restext});
		this.props.response(restext);
	}

	updateSelectedSections = (arg) =>{
		this.setState({selectedSections: arg})
		console.log(this.state.selectedSections)
		this.secOrder(this.props.questions.filter(item => {
			return arg.includes(item.sectionid)
		}))
		console.log(this.props.questions.filter(item => {
			return arg.includes(item.sectionid)
		}))
	}
	secOrder = (order) => 
	{
		this.props.secOrder(order);
		this.render()
	}

	
    render() {
		return(
		
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > 
					<Toolbar 
					data={this.props.questions}
					selectedSections = {this.state.selectedSections}
					updateSelectedSections = {this.updateSelectedSections.bind(this)}
					/>
				</div>
				
				<div style={{width: '20%', float: 'left'}}> <p></p>  </div>
				
				<div className="Dashboard">
					<Dashboard data={this.props.questions} resData={this.props.resData} callbackQPage={this.qPage} callbackOrder={this.secOrder.bind(this)}/>
				</div>
				
				<div style={{width: '20%'}}>  </div>
				<br></br>
				<div className = "exportButtons-wrapper">
					<button className = "downloadFree">
						Download Free
					</button>
					<br></br>
					<br></br>
					<button className = "downloadPaid">
						Download Paid
					</button>
				</div>
			</div>

		);
		
    }
  
}


export default QuestionPage;
