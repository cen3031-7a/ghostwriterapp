import React, {Component} from 'react';
import  './QuestionPage.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import Toolbar from '../../components/Toolbar/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionPage extends Component {
	
	constructor(props) {
	 
		super(props);
		this.state = {
			text: '',
			block: [],
			selectedSections: this.props.resData.map((id) => {
				return id.sectionid;
			}),
			questionsOpen: [],
			allHints: []
		};

	}
	
	//callback when question is clicked to add it to toggle it in the array of questions that are open
	//array is populated with the question ids that are open
	toggleQuestionBoolean = (id) => {
		if(this.state.questionsOpen.includes(id)){
			let temp = this.state.questionsOpen.filter(questionid=>{
				return id !== questionid
			})
			this.setState({questionsOpen: temp})
		}
		else{
			let temp = this.state.questionsOpen
			temp.push(id)
			this.setState({questionsOpen: temp})
		}
		//console.log(this.state.questionsOpen)
	}

	//Callback to POST response text in App.js
	qPage = (restext) =>
	{
		this.setState({text: restext});
		this.props.response(restext);
	}

	//callback from toolbar to update the array of selected sections that will appear in the dashboard
	updateSelectedSections = (arg, sectionId) =>{
		console.log(arg.length)
		console.log(this.props.resData)
		if(arg.length > this.props.resData.length){
			let temp = this.props.questions.filter(item => {
				return item.sectionid === sectionId
			})
			console.log(temp)
			let temp2 = this.props.resData
			temp2.push(temp[0])
			console.log(temp2)
			this.props.secOrder(temp2)
		} 
		else{
			let temp = this.props.resData.filter(item => {
				return arg.includes(item.sectionid)
			})
			console.log(temp)
			this.props.secOrder(temp)
		}
	}

	//calls the post order from app.js to make the api call to the database to update the users "timeline"
	//"timeline" is the users data of sections questions and responses
	
	//Callback to POST section order
	secOrder = (order) => 
	{	
		console.log(order)
		this.props.secOrder(order);
		this.render()
	}


	//when no questions are selected the writing tips button will randomly select from the list of all available hints, this method populates that array
	populateHints = () => {
        let temp = []
        this.props.questions.forEach((section) =>{
            section.questions.forEach((question) => {
                question.tips.forEach(tips => {
                    if(!temp.includes(tips)){
                        temp.push(tips)
                    }
                })
            })
		})
		return temp
    }

	
	//Render Dashboard with Toolbar, Questions/Sections, and Download buttons
    render() {
		const selectedSections = this.props.resData.map((id) => {
			return id.sectionid;
		})
		const allHints = this.populateHints()
		console.log(allHints)
		return(
			
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > 
					<Toolbar 
					data={this.props.questions}
					resData = {this.props.resData}
					selectedSections = {selectedSections}
					updateSelectedSections = {this.updateSelectedSections.bind(this)}
					questionsOpen = {this.state.questionsOpen}
					allHints= {allHints}
					/>
				</div>

				<div className="Dashboard">
					<Dashboard oldData={this.props.oldData} data={this.props.questions} resData={this.props.resData} callbackQPage={this.qPage} callbackOrder={this.secOrder.bind(this)} toggleQuestionBoolean = {this.toggleQuestionBoolean}/>
				</div>
				
				<br></br>
				<div className = "exportButtons-wrapper">
					<button className = "downloadFree" onClick = {() => this.props.printPDF()}>
						Download Free
					</button>
					<br></br>
					<br></br>
					<button className = "downloadPaid" onClick = {() => this.props.printPDF()}>
						Download Paid
					</button>
				</div>
			</div>

		);
		
    }
  
}


export default QuestionPage;
