import React, { Component } from 'react';
import Question from '../../components/Question/Question';

class Section extends Component {

	//Callback to App.js to POST text
	textRes = (text) => {
		this.props.callbackDash(text);
	}

	questionIsClosed = (questionId) =>{
		this.props.questionIsClosed(questionId)
	}

	questionIsOpen = (questionId) =>{
		this.props.questionIsOpen(questionId)
	}

	toggleQuestionBoolean = (id) =>{
		this.props.toggleQuestionBoolean(id)
	}

    render() {

		const data = this.props.data;
		const resData = this.props.resData;
		
		//Render Questions in section
		const questionData = data.questions
			.map((q, i) => {
				return(
					<Question 
						question={data.questions[data.questions.findIndex((e) => e.questionid === q.questionid)].question}  
						resText={resData.questions[i]} 
						key={q.questionid} 
						id={q.questionid} 
						callbackQ={this.textRes}
						toggleQuestionBoolean = {this.toggleQuestionBoolean} 
					/>
				)
			})

		return(
			<div className="App">	
				<div>
					{questionData}
				</div>
			</div>
		);
		
    }
  
}


export default Section;
