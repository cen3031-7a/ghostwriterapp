import React, {Component} from 'react';
import  './Home.css';
import Collapsible from 'react-collapsible';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import TextBox from '../../components/TextBox/TextBox';
import Section from '../../components/Section/Section';

class Home extends Component {
	
	constructor(props)
	{
		super(props);
	}
	
    render() {
		
		return(
			<div className="App">
			
			<div className='section' ref={this.dragBox}>

				<Collapsible transitionTime={200} trigger="Test Section" ref="P1">
					<Section data={this.props.data}
					/>
				</Collapsible>
				
				<Collapsible transitionTime={200} trigger="Test Section 2" ref="P1">
					<Section data={this.props.data}
					/>
				</Collapsible>
				
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
			  const colInt = parseInt(target.id);
			  console.log(target);
			  console.log(source);
			  console.log(el);
			  
		  })
		  
		}
		
	};
  
}


export default Home;
