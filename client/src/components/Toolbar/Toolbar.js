import React, {Component} from 'react';
import  './Toolbar.css';
//import {FontAwesome} from '../../../node_modules/@fortawesome/react-fontawesome'

class Toolbar extends Component {
    constructor(props)
	{
		super(props);
		this.state = {
            data: this.props.data,
            listOpen: false,
            hintShowing: false
    		}
	}
    
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    toggleHint(){
        this.setState(prevState =>({
            hintShowing: !prevState.hintShowing
        }))
    }

    handleClickOutside(){
        this.setState({listOpen: false})
    }

    setSection(sectionid){
        if(this.props.selectedSections.includes(sectionid)){
            this.props.removeSection(sectionid)
        }
        else{
            this.props.addSection(sectionid)
        }
    }
    
    render(){
        const {data, listOpen} = this.state
        const {selectedSections} = this.props      

        return(
            <div className = "toolbar-wrapper">
            <div className = "HintButton-wrapper">
                <button className="hintButton" onClick = {() => this.toggleHint()}>I Want A Hint</button>
            </div>
            <div className = "hintBox">
                {this.state.hintShowing && <p>hi</p>}
            </div>
            <br></br>
            <div className="SelectSection-wrapper">
                <div className="SelectSection-header" onClick = {()=>this.toggleList()}>
                    <b className="SelectSection-header-title">Select Section {listOpen ? <b>^</b>: <b>></b>}</b>
                    
                </div>
                {listOpen && <ul className="SelectSection-list">
                    {data.map((item) => (
                        <li className="SelectSection-list-item" 
                            key={item.sectionname}
                            onClick = {() => this.setSection(item.sectionid)}>
                            {item.sectionname} {selectedSections.includes(item.sectionid) ? <b>*</b> : <b></b> }
                        </li>
                    ))}
                </ul>}
            </div>

            </div>
        )
    }
}
export default Toolbar;