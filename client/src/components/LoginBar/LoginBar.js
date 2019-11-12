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
                            outline color="danger"
                            size="lg"
                            block
                            >
                            Sign Up
                        </Button>
                        &nbsp;&nbsp;&nbsp;

                        <Button
                            tag={Link}
                            to="/Login"               
                            outline color="dark"
                            size="lg"
                            block
                            >
                            Login
                        </Button>

                        &nbsp;&nbsp;&nbsp;

                        <Button
                            tag={Link}
                            to="/Loginfb"
                            outline color="primary"
                            size="lg"
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