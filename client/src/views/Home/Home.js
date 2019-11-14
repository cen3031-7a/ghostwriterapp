import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './Home.css';
import HomeVideo from '../../components/HomeVideo/HomeVideo.js';
import LoginBar from '../../components/LoginBar/LoginBar.js';
import About from '../../components/About/About.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

    render() {
		
		return(
			
			<div className="App">
				<div class="container">
					<div class="row">
						<div class="col-10">
							<div classname="HomeVideo">
								<HomeVideo />	
							</div>
						</div>
						<div class="col">
							<LoginBar />
						</div>
					</div>
					<div class="row">
						<About />
					</div>
				</div>
			</div>

		);
		
    }

}


export default Home;
