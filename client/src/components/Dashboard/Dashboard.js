import React, {Component} from 'react';
import  './Dashboard.css';
import Collapsible from 'react-collapsible';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import Section from '../../components/Section/Section';

class Home extends Component {
	
	parentDash = (text) =>
	{
		
		this.props.callbackQPage(text);
		
	}
	
    render() {
		
		const {data} = this.props;
			const sectionData = data
				.map(q => {
					return(
						<Collapsible transitionTime={200} trigger={q.title} key={q.id}>
							<Section data={this.props.data[q.id]} id={q.id} callbackDash={this.parentDash} />
						</Collapsible>
					)
				})
		
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
			  
			  //Debug info for later, to implement saving of section orders!!!
			  const colInt = parseInt(target.key);
			  console.log(target);
			  console.log(source);
			  console.log(el);
			  console.log(colInt);
			  console.log(target.trigger);
			  
		  })
		  
		}
		
	};
  
}


export default Home;
