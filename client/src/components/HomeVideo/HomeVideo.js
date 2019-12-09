import React, {Component} from 'react';
import './HomeVideo.css';

class HomeVideo extends Component{
  constructor(props) {

		super(props);
		this.state = 
		{	
			urlData: '',
			url: ''		 
		};
	}

  //Get url of video
  componentDidMount() {
		
    this.getURL();

  }

	//Fetch url link from database
  getURL = () => {
		fetch('/api/publicdata/front-page-youtube-link')
      .then((urlData) => urlData.json())
      .then((res) => this.setState({url: res.link}))
	  }

    render() {
        return (
          //wrapper class that makes home video responsive
          //uses iframe for embedded video, using link set in state from Mongo
          <div className="videoWrapper">
            <iframe 
            width="800" 
            height="450" 
            src={this.state.url}
            frameborder="0" 
            allowfullscreen>
            </iframe>
        </div>
        );
      }
}
  
export default HomeVideo;