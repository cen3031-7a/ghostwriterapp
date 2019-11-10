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
						question={resData.questions[i].question}  
						resText={data.questions[i]} 
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
