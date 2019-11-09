import React, {Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import QuestionPage from "./views/QuestionPage/QuestionPage"
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";

class App extends Component {
	
	constructor(props) {

		super(props);
		this.state = 
		{
			
			data: [],
			resData: [],
			intervalIsSet: false,
			
		 };

	}
	
	componentDidMount() {
		
		this.getData();
		
		if (!this.state.intervalIsSet)
		{
		
			let interval = setInterval(this.getData, 300000);
			this.setState({ intervalIsSet: interval });
			
		}
	
	}

	componentWillUnmount() {
	  
		if (this.state.intervalIsSet)
		{
		
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
	  
		}
	
	}
  
	getData = () => {
	  
		fetch('/api/sections?include_questions=true')
			.then((data) => data.json())
			.then((res) => this.setState({data: res.sections}));
		  
		fetch('/api/users/timeline?include_sections=true&include_questions=true')
			.then((data) => data.json())
			.then((res) => this.setState({resData: res.timeline}));
	  
	}
  
	postText = (text) => {
	  
		fetch('/api/users/question/response', {
			
			method: 'POST',
			body: 
				JSON.stringify({questionid: text.id, response: text.text.text}),
			headers:
			{
				'Content-Type': 'application/json'
			}
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('posting', body);
		}); 
	 
	}
  
	postOrder = (order) => {
		
		fetch('/api/users/timeline', {
			
			method: 'POST',
			body: 
				JSON.stringify({timeline: order}),
			headers: 
			{
				'Content-Type': 'application/json'
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('posting', body);
		}); 

	}
	
	render() {
		
		return (
			<div>
			
				<Header />
				<Switch>
				
					<Route exact path="/Home" render={() => <Home data={this.state.data} />}/>
					<Route exact path="/Questions" render={() => <QuestionPage questions={this.state.data} resData={this.state.resData} response={this.postText} secOrder={this.postOrder} />}/>
					
					<Route exact path="/">
						<Redirect to="/Home" />
					</Route>
					
					<Route component={NotFound}/>
					
				</Switch>
				
			</div>
		);
	  
	}
	
	
 };

 

export default App;
