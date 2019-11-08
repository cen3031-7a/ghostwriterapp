import React, {Component} from 'react';
import  './Dashboard.css';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import Section from '../../components/Section/Section';
import { Accordion, Card } from 'react-bootstrap';

var sectionData;

class Home extends Component {
	
	constructor(props)
	{
		super(props);
		this.state = {
			order: []
		}
	}
	
	orderUpdate(value) {
	  
		this.setState({
				order: value
			})
			
		console.log(this.state.order);
		
		
  }
	
	parentDash = (text) =>
	{
		
		this.props.callbackQPage(text);
		
	}
	
    render() {
		
		const {data} = this.props;
			sectionData = data
				.map(q => {
					return(
						<Accordion id={q.id} defaultActiveKey="0" style={{backgroundColor: 'white'}} key={q.id}>
							<Card style={{borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}>
								<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
									{q.title}
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="1">
									<Card.Body>
										<Section className="SECTION" data={this.props.data[q.id]} id={q.id} callbackDash={this.parentDash} />
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					)
				})
				
				console.log(sectionData)
		
		return(
			<div className="App">
			
			<div className="section" ref={this.dragBox}>

				{sectionData}
				
				</div>
				
			</div>

		);
		
    }
  
  dragBox = (componentBackingInstance) => {
	  
		if (componentBackingInstance) {
			
		  let options = { };
		  const dragula = Dragula([componentBackingInstance], options);
		  dragula.on('drop', (el, target, source, sibling) => {
			  
			 var newOrder = [];
	
			  for(var i = 0; i < target.childNodes.length; i++)
				  newOrder[i] = target.childNodes[i].id;
			  
			 this.orderUpdate(newOrder);
				  
			  
		  })
		  
		}
		
	};
  
}


export default Home;
