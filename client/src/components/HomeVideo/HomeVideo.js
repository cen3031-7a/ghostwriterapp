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

  componentDidMount() {
		
    this.getURL();

  }

  getURL = () => {
		fetch('/api/publicdata/front-page-youtube-link')
      .then((urlData) => urlData.json())
      .then((res) => this.setState({url: res.link}))
	  }

    render() {
        return (
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