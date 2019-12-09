import React, {Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import QuestionPage from "./views/QuestionPage/QuestionPage"
import NotFound from "./views/NotFound";
import AdminPage from "./views/AdminPage/AdminPage"
import AccountPage from "./views/AccountPage/AccountPage"
import Header from "./components/Header/Header";

class App extends Component {
	
	constructor(props) {

		super(props);
		this.state = 
		{

			data: [],
			oldData: [],
			resData: [],
			userInfo: [],
			token: '',
			intervalIsSet: false,
			hasData: false,
			hasOld: false,
			userid: ''

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
			
		fetch('/api/sections?include_questions=true&showDeleted=true')
			.then((data) => data.json())
			.then((res) => this.setState({oldData: res.sections}))
			.then(() => console.log("GOT OLD DATA"))
			.then(() => this.setState({hasOld: true}));
		  
		fetch('/api/users/timeline?include_sections=true&include_questions=true&AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
			method: 'GET',
			headers:
			{
				'Authorization': this.state.token
			}
			
		})
			.then((data) => data.json())
			.then((res) => this.setState({resData: res.timeline}))
			.then(() => console.log("GOT Res"));
	  
		fetch('/api/users/info?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'GET',
			headers:
			{
				'Authorization': this.state.token
			}
			
		})
			.then((data) => data.json())
			.then((res) => this.setState({userInfo: res.accounttype}) );
	}

	//method to print out pdf
	//go to users routes in server folder to see where fetch is coming from
	printPDF = () => {
		fetch('/api/users/info?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {

			method: 'GET',
			headers:
			{
				'Authorization': this.state.token
			}
		})
			.then((data) => data.json())
			.then((body) => this.setState({userid: body.userid}))
			.then((body) =>console.log(this.state.userid))
			
		fetch('/api/users/download/pdf?AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
			method: 'GET',
			headers:
			{
			'Authorization': this.state.token
			}
			
		})
			.then((data) => data.blob())
			.then((blob) =>
			{
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `myStory.pdf`);
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
			});
	}
	

  
	postText = (text) => {
	  
		fetch('/api/users/question/response?AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
			method: 'POST',
			body: 
				JSON.stringify({questionid: text.id, response: text.text}),
			headers:
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
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
				'Content-Type': 'application/json',
				'Authorization': this.state.token
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
		if(this.state.hasData && this.state.hasOld && this.state.userInfo === 'admin')
		return (
			<div>
			
				<Header />
				<Switch>
				
					<Route exact path="/Home" render={() => <Home data={this.state.data} />}/>
					<Route exact path="/Questions" render={() => <QuestionPage oldData={this.state.oldData} questions={this.state.data} resData={this.state.resData} response={this.postText.bind(this)} secOrder={this.postOrder.bind(this)} allHints={this.state.allHints} printPDF = {this.printPDF.bind(this)}/>}/>
					<Route exact path="/Login" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/Signup" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/Loginfb" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/Admin" render={() => <AdminPage data={this.state.data} />}/>
					<Route exact path="/MyAccount" render={() => <AccountPage data={this.state.data} />}/>
					<Route exact path="/">
						<Redirect to="/Home" />
					</Route>
					
					<Route component={NotFound}/>
					
				</Switch>
				
			</div>
		);
		else if(this.state.hasData && this.state.hasOld)
		return (
			<div>
			
				<Header />
				<Switch>
				
					<Route exact path="/Home" render={() => <Home data={this.state.data} />}/>
					<Route exact path="/Questions" render={() => <QuestionPage oldData={this.state.oldData} questions={this.state.data} resData={this.state.resData} response={this.postText.bind(this)} secOrder={this.postOrder.bind(this)} allHints={this.state.allHints} printPDF = {this.printPDF.bind(this)}/>}/>
					<Route exact path="/Login" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/Signup" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/google" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/facebook" render={() => <NotFound data={this.props.data} />}/>
					<Route exact path="/MyAccount" render={() => <AccountPage data={this.state.data} />}/>
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
