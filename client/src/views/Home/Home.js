import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './Home.css';

class Home extends Component {
	
    render() {
		
		return(
			<div className="App">
				<div>
				 <Link id="question-link" to="/Questions">
					<button style={{width: '100px', height: '100px'}}>CLICK FOR QUESTIONS </button>
				</Link>
				</div>
			</div>

		);
		
    }

}


export default Home;
