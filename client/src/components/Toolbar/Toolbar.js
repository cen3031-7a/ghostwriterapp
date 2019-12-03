import React, {Component} from 'react';
import  './Toolbar.css';
//import {FontAwesome} from '../../../node_modules/@fortawesome/react-fontawesome'

class Toolbar extends Component {
    constructor(props)
	{
		super(props);
		this.state = {
            listOpen: false,
            hintShowing: false,
            allHints: this.props.allHints,
            toolbarSections: this.populateToolbarSections()
    		}
	}
    
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
        console.log(this.state.listOpen)
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
        console.log(this.props.selectedSections)
        if(this.props.selectedSections.includes(sectionid)){
            this.removeSection(sectionid)
        }
        else{
            this.addSection(sectionid)
        }
    }

    addSection = (sectionId) =>
	{
		let temp = this.props.selectedSections
		temp.push(sectionId)
        console.log(temp)
        this.props.updateSelectedSections(temp, sectionId)
	}

	removeSection = (sectionId) =>
	{
		let temp = this.props.selectedSections.filter(item => {
			return item !== sectionId
        })
        console.log(temp)
		this.props.updateSelectedSections(temp, sectionId)
	}
    
    getCurrentHints = () => {
        let temp = []
        this.props.data.forEach((section) => {
            section.questions.forEach((question) => {
                if(this.props.questionsOpen.includes(question.questionid)){
                    question.tips.forEach((tip) => {
                        temp.push(tip)
                    })
                }
            })
        })
        return temp
    }

    populateToolbarSections = () => {
        let temp = []
        let temp2 = this.props.data.map((section) => {
            return section.sectionid
        })
        temp = this.props.data
        this.props.resData.forEach((section) => {
            if(!temp2.includes(section.sectionid)){
                temp.push(section)
            }
        })
        return temp
    }
    

    render(){
        const selectedSections = this.props.selectedSections
        const data = this.props.data 
        const listOpen = this.state.listOpen
        const questionsOpen = this.props.questionsOpen
        const questionsOpenIsFilled = !(questionsOpen.length === 0)
        let currentHints = []
        currentHints = this.getCurrentHints()
        let hintChoice = Math.round(Math.random() * currentHints.length)
        let hintChoice2 = Math.round(Math.random() * this.state.allHints.length)
        console.log(data)
        return(
            <div className = "toolbar-wrapper">
            <div className = "HintButton-wrapper">
                <button className="hintButton" onClick = {() => this.toggleHint()}>Show Me a Writing Tip</button>
            </div>
            <div className = "hintBox">
                {this.state.hintShowing && questionsOpenIsFilled ? <p>{currentHints[hintChoice]}</p>: <p></p>}
                {this.state.hintShowing && <p>{this.state.allHints[hintChoice2]}</p>}
            </div>
            <br></br>
            <div className="SelectSection-wrapper">
                <div className="SelectSection-header" onClick = {()=>this.toggleList()}>
                    <b className="SelectSection-header-title">Select Section {listOpen ? <b>^</b>: <b>></b>}</b>
                    
                </div>
                {listOpen && <ul className="SelectSection-list">
                    {this.state.toolbarSections.map((item) => (
                        <li className="SelectSection-list-item" 
                            key={item.sectionname}
                            onClick = {() => this.setSection(item.sectionid)}>
                            {item.sectionname} {selectedSections.includes(item.sectionid) ? <b>*</b> : <b></b>}
                        </li>
                    ))}
                </ul>}
            </div>

            </div>
        )
    }
}
export default Toolbar;

