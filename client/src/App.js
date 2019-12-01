import React, {Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import QuestionPage from "./views/QuestionPage/QuestionPage"
import NotFound from "./views/NotFound";
import AdminPage from "./views/AdminPage/AdminPage"
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import Header from "./components/Header/Header";

class App extends Component {
	
	constructor(props) {

		super(props);
		this.state = 
		{
			
			data: [],
			resData: [],
			intervalIsSet: false,
			hasData: false
			
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
			.then((res) => this.setState({data: res.sections}))
			.then(() => console.log("GOT DATA"))
			.then(() => this.setState({hasData: true}));
		  
		fetch('/api/users/timeline?include_sections=true&include_questions=true&AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8')
			.then((data) => data.json())
			.then((res) => this.setState({resData: res.timeline}))
			.then(() => console.log("GOT Res"));
	  
	}

	
	

  
	postText = (text) => {
	  
		fetch('/api/users/question/response?AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
			method: 'POST',
			body: 
				JSON.stringify({questionid: text.id, response: text.text}),
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
		})
		.then(() => this.getData());
	 
	}
  
	postOrder = (order) => {
		
		fetch('/api/users/timeline?AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
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
		})
		.then(() => this.getData());

	}
	
	render() {
	
		if(this.state.hasData)
		return (
			<div>
			
				<Header />
				<Switch>
				
					<Route exact path="/Home" render={() => <Home data={this.state.data} />}/>
					<Route exact path="/Questions" render={() => <QuestionPage questions={this.state.data} resData={this.state.resData} response={this.postText.bind(this)} secOrder={this.postOrder.bind(this)} />}/>
					<Route exact path="/Login" render={() => <Login data={this.props.data} />}/>
					<Route exact path="/Signup" render={() => <Signup data={this.props.data} />}/>
					<Route exact path="/Admin" render={() => <AdminPage data={this.state.data} />}/>
					<Route exact path="/">
						<Redirect to="/Home" />
					</Route>
					
					<Route component={NotFound}/>
					
				</Switch>
				
			</div>
		);
		else return(<div />);
	  
	}
	
	
 };

 

export default App;