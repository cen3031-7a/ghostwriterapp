import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './HomeVideo.css';

class HomeVideo extends Component{

    render() {

        return (
          
          <div className="player-wrapper">
            <ReactPlayer 
              classname='react-player'
              url='https://www.youtube.com/watch?v=t9rBgDtC51U'
              controls={true}
              width="800px"
              height="450px"
              config={{
                youtube: {
                  playerVars: { playsinline: 1 }
                }}} 
              />
          </div>
        );
      }
}
  
export default HomeVideo;