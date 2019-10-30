import React, {Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";



class App extends Component{
	
	constructor(props){
		super(props);
	};
	
	render() {
	
	return (
		<div>
		  <Header />
		  <Switch>
			<Route exact path="/Home" render={() => <Home data={this.props.data} />}/>
			<Route exact path="/">
			  <Redirect to="/Home" />
			</Route>
			<Route component={NotFound}/>
		  </Switch>
		</div>
	);
  
	}
  
}

export default App;
