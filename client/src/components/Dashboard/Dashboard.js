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
		this.state = 
		{
			order: [],
			empty: true
		}

	}
	
	orderUpdate(value)
	{
	  
		this.setState ({
			order: value
		})
			
		this.props.callbackOrder(value);

	}
	
	parentDash = (text) =>
	{

		this.props.callbackQPage(text);
		
	}

	
	
    render() {
		
		const data = this.props.data;
		const resData = this.props.resData;

		//const empty = resData.isEmpty()

		if(resData.length === 0) this.state.empty = true
		else this.state.empty = false
		
		sectionData = resData
			.map((q, i) => {

				return(
				
					<Accordion id={q.sectionid} defaultActiveKey="0" style={{backgroundColor: 'white'}} key={q.sectionid}>
						<Card style={{borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}>
						
							<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
								{data[data.findIndex((e) => e.sectionid === q.sectionid)].sectionname}
							</Accordion.Toggle>
							
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<Section className="SECTION" data={q} resData={data[data.findIndex((e) => e.sectionid === q.sectionid)]} id={q.sectionid} callbackDash={this.parentDash} />
								</Card.Body>
							</Accordion.Collapse>

						</Card>
					</Accordion>
					
				)
				
			})
		
		return(
		
			<div className="App">
			
				<div className="section" ref={this.dragBox}>

					{sectionData}
					{this.state.empty && <p className="noSections">Select a Section from the Select Section Dropdown to Add a Section to Your Story</p>}

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
				  newOrder[i] = {sectionid: target.childNodes[i].id};
			  
			 this.orderUpdate(newOrder);
				  
			  
		  })
		  
		}
		
	};
  
}


export default Home;
