import React, { Component } from 'react';
import Question from '../../components/Question/Question';

class Section extends Component {
	
	textRes =(text) => {
		this.props.callbackDash(text);
	}

    render() {
		
		const {data} = this.props;
			const questionData = data.questions
				.map(q => {
					return(
						<Question question={q.question} key={q.id} id={q.id} callbackQ={this.textRes} />
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
