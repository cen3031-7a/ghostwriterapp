import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './LoginBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'reactstrap'

class LoginBar extends Component{
    render(){
        return(

            <div className="btn-box">
                <ButtonGroup vertical>
                        <Button
                            tag={Link}
                            to="/Signup"
                            outline color="dark"
                            size="lg"
                            width="20%"
                            height="30%"
                            block
                            >
                            Sign Up / Sign In
                        </Button>
                        &nbsp;&nbsp;&nbsp;


                        <Button
                            tag={Link}
                            to="/google"               
                            outline color="warning"
                            size="lg"
                            width="20%"
                            height="30%"
                            block
                            >
                            Login via Google
                        </Button>

                        &nbsp;&nbsp;&nbsp;

                        <Button
                            tag={Link}
                            to="/facebook"
                            outline color="primary"
                            size="lg"
                            width="20%"
                            height="30%"
                            block
                            >
                            Login via Facebook
                        </Button>
                </ButtonGroup>

            </div>
        )
    }
}

export default LoginBar;