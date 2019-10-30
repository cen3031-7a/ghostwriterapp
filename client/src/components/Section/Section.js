import React, { Component } from 'react';
import  './Section.css';
import Collapsible from 'react-collapsible';
import TextBox from '../../components/TextBox/TextBox';

class Section extends Component {

    render() {
		
		const {data} = this.props;
			const questionData = data.questions
				.map(q => {
					return(
						<Collapsible transitionTime={200} trigger={q.question} key={q.id}> <TextBox /> </Collapsible>
					)
				})
		
		return(
        <div className="App">	
				{questionData};
		</div>
		
		);
		
    }
  
}


export default Section;
