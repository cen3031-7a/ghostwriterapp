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
			selectedSections: [],
			order: this.props.questions.map(section => {
				return section.sectionid
			})
		};

	}
	
	qPage = (restext) =>
	{
		this.setState({text: restext.text});
		this.props.response(restext);
	}

	setOrder = (order) => {
		this.setState({order: order})
		this.secOrder()
	}
	
	secOrder = () => 
	{
		var intersection = this.state.order.filter( (e) => {
			return this.state.selectedSections.indexOf(e) > -1
		})
		//this.props.secOrder(intersection);
		this.setState({order: intersection})
		console.log(this.state.order)
		console.log(this.state.selectedSections)

		console.log(intersection)
	}

	addSection = (sectionId) =>
	{
		let temp = this.state.selectedSections
		temp.push(sectionId)
		console.log(sectionId)
		this.setState({selectedSections: temp})
		this.secOrder()
	}

	removeSection = (sectionId) =>
	{
		let temp = this.state.selectedSections.filter(sectionId => {
			return this.state.selectedSections.indexOf(sectionId) > -1
		})
		this.setState({selectedSections: temp})
		this.secOrder()
	}
	
	
    render() {
		
		return(
		
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > 
					<Toolbar 
					data={this.props.questions}
					selectedSections = {this.state.selectedSections}
					addSection = {this.addSection.bind(this)}
					removeSection = {this.removeSection.bind(this)}
					/>
				</div>
				
				<div style={{width: '20%', float: 'left'}}> <p></p>  </div>
				
				<div className="Dashboard">
					<Dashboard data={this.props.questions} resData={this.props.resData} callbackQPage={this.qPage} callbackOrder={this.setOrder.bind(this)}/>
				</div>
				
				<div style={{width: '20%'}}>  </div>
				<br></br>
				<div className = "exportButton-wrapper">
					<button className = "exportButton">
						Export
					</button>
				</div>
			</div>

		);
		
    }
  
}


export default QuestionPage;
