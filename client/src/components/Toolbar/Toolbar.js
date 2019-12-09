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
    
    //toggles on the click of the select sections toolbar header whether the dropdown is open or closed
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    //toggles on the click of the hint button whether there is a hint showing or not
    toggleHint(){
        this.setState(prevState =>({
            hintShowing: !prevState.hintShowing
        }))
    }

    //not yet implemented but will toggle the dropdown to close on a click outside of the dropdown
    handleClickOutside(){
        this.setState({listOpen: false})
    }
    

    //called on the click of an item in the dropdown checks whether or not it is a selected section then calls the appropriate method
    setSection(sectionid){
        if(this.props.selectedSections.includes(sectionid)){
            this.removeSection(sectionid)
        }
        else{
            this.addSection(sectionid)
        }
    }

    //called by setSection method; adds the section id of the newly selected section to an array and passes it up to questions page where it is sent futher to the database
    addSection = (sectionId) =>
	{
		let temp = this.props.selectedSections
		temp.push(sectionId)
        this.props.updateSelectedSections(temp, sectionId)
	}

    //called by setSection method; removes the section id of the newly selected section to an array and passes it up to questions page where it is sent futher to the database
	removeSection = (sectionId) =>
	{
		let temp = this.props.selectedSections.filter(item => {
			return item !== sectionId
        })
		this.props.updateSelectedSections(temp, sectionId)
	}
    
    //on the render of this component this method is called to check the questionids in the questionsOpen array and return an array with the hints associated with those questions
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

    //this method is a check if the admin has deleted a section available it will no longer appear in the data array
    //however if the section is still in the users "resData" it will still appear until the user deletes that section then it will no longer be available
    populateToolbarSections = () => {
        let temp = []
        let temp2 = this.props.data.map((section) => {
            return section.sectionid
        })
        temp = this.props.data
        this.props.resData.forEach((section) => {
            if(!temp2.includes(section.sectionid)){
                temp.push(section)
                console.log(temp)
            }
        })
        console.log(temp2)
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
        return(
            <div className = "toolbar-wrapper">
            <div className = "HintButton-wrapper">
                <button className="hintButton" onClick = {() => this.toggleHint()}>Writing Tips</button>
            </div>
            <br className="linebreak"></br>
            <div className = "hintBox">
                {this.state.hintShowing && questionsOpenIsFilled ? <p>{currentHints[hintChoice]}</p>: <p></p>}
                {this.state.hintShowing && <p>{this.state.allHints[hintChoice2]}</p>}
            </div>
            <br className="linebreak"></br>
            <div className="SelectSection-wrapper">
                <div className="SelectSection-header" onClick = {()=>this.toggleList()}>
                    <b className="SelectSection-header-title">Select Section {listOpen ? <b>^</b>: <b>></b>}</b>
                    
                </div>
                {listOpen && <ul className="SelectSection-list">
                    {this.state.toolbarSections.map((item) => (
                        <li className="SelectSection-list-item" 
                            key={item.sectionname}
                            onClick = {() => this.setSection(item.sectionid)}>
                            {item.sectionname} {selectedSections.includes(item.sectionid) ? <b>✓</b> : <b></b>}
                        </li>
                    ))}
                </ul>}
            </div>

            </div>
        )
    }
}
export default Toolbar;

