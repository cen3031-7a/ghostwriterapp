import React, { Component } from 'react';
import Question from '../../components/Question/Question';

class Section extends Component {

	textRes = (text) => {
		this.props.callbackDash(text);
	}

    render() {

		const data = this.props.data;
		const resData = this.props.resData;
		

		const questionData = data.questions
			.map((q, i) => {
				return(
					<Question 
						question={data.questions[data.questions.findIndex((e) => e.questionid === q.questionid)].question}  
						resText={resData.questions[i]} 
						key={q.questionid} 
						id={q.questionid} 
						callbackQ={this.textRes} 
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
