import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'reactstrap'

class Register extends Component {

    render() {
		
		return(
            <div className="btn-box">
                <ButtonGroup horizontal>
                        <Button
                            tag={Link}
                            to="/Signup"
                            outline color="dark"
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
                            to="/Facebook"               
                            outline color="dark"
                            size="lg"
                            block
                            >
                            Facebook
                        </Button>

                        &nbsp;&nbsp;&nbsp;

                        <Button
                            tag={Link}
                            to="/Google"               
                            outline color="dark"
                            size="lg"
                            block
                            >
                            Google
                        </Button>

                </ButtonGroup>
            </div>
        );
    }
}


export default Register;