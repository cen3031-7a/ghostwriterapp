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
        this.setState({
            listOpen: false
        })
    }
    
    render(){
        const {data, listOpen} = this.state
        
        return(
            <div className = "toolbar-wrapper">
            <div className="SelectSection-wrapper">
                <div className="SelectSection-header" onClick = {()=>this.toggleList()}>
                    <div className="SelectSection-header-title">Select Section</div>
                    {listOpen
                        ? <b>^</b>
                        : <b>></b>
                    }
                </div>
                {listOpen && <ul className="SelectSection-list">
                    {data.map((item) => (
                        <li className="SelectSection-list-item" 
                            key={item.title}
                            onClick = {() => this.props.toggleSelected(item.id)}>
                        {item.title}{item.selected && <b>*</b>}</li>
                    ))}
                </ul>}
            </div>
            <div className = "HintButton-wrapper">
                <button className="hitButton" onClick = {() => this.toggleHint()}>I want a hint</button>
            </div>
            <div className = "hintBox">
                {this.state.hintShowing && <p>hi</p>}
            </div>
            </div>
        )
    }
}
export default Toolbar;