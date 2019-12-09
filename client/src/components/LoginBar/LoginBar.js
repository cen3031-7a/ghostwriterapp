import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './LoginBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'reactstrap'
import SignModal from '../../components/SignModal/SignModal.js';

class LoginBar extends Component{
    render(){
        return(
            <div className="btn-box">
                <ButtonGroup vertical>
                        <SignModal className="button-right"/>
                        &nbsp;
                        <Button
                            className="btn-font"
                            tag={Link}
                            to="/google"               
                            outline color="danger"
                            size="lg"
                            width="auto"
                            height="auto"
                            >
                            Login via Google
                        </Button>

                        &nbsp;

                        <Button
                            className="btn-font"
                            tag={Link}
                            to="/facebook"
                            outline color="primary"
                            size="lg"
                            width="auto"
                            height="auto"
                            >
                            Login via Facebook
                        </Button>
                </ButtonGroup>

                </div>
        )
    }
}

export default LoginBar;
