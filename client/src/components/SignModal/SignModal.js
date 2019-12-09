import React, {Component} from 'react';
import  './SignModal.css';
import ReactModalLogin from 'react-modal-login';

class SignModal extends Component {

  //code tweaked from :
  //https://github.com/thebeaverhead/react-modal-login/blob/master/demo/es/samples/Sample.js

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      email: '',
      password: '',
      confirmPass: '',
      firstname: '',
      lastname: ''
    };

  }

  //upon pressing sign in, sets user input to state for email, password, etc.
  //if nothing is entered in either email or password, sends an error
  //otherwise the state is set and login success
  onLogin() {
    console.log('__onLogin__');
    this.setState({email: document.querySelector('#email').value});
    this.setState({password: document.querySelector('#password').value});

    console.log(this.state.email)
    console.log(this.state.password)
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
      this.setState({
        error: true
      })
    } else {
      this.onLoginSuccess();
    }
  }

  //upon pressing sign up, sets user input to state for email, password, etc.
  //if any fields are empty, or password confirmation doesn't match, sends an error
  //otherwise the state is set and login success
  onRegister() {
    console.log('__onRegister__');
    // console.log('login: ' + document.querySelector('#login').value);
    this.setState({firstname: document.querySelector('#firstname').value});
    this.setState({lastname: document.querySelector('#lastname').value});
    this.setState({email: document.querySelector('#email').value});
    this.setState({password: document.querySelector('#password').value});
    this.setState({confirmPass: document.querySelector('#confirmPass').value});

    console.log(this.state.firstname)
    console.log(this.state.lastname)
    console.log(this.state.email)
    console.log(this.state.password)
    console.log(this.state.confirmPass)

    const fName = document.querySelector('#firstname').value;
    const lName = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPass = document.querySelector('#confirmPass').value;


    if ( !fName || !lName || !email || !password || password!=confirmPass) {
      this.setState({
        error: true
      })
    } else {
       this.onLoginSuccess();
    }
  }

  //sets state to make login pop up visible
  openModal(initialTab) {
    this.setState({
      initialTab: initialTab
    }, () => {
      this.setState({
        showModal: true,
      })
    });
  }

  //upon login success, closes pop up and sets method of log in
  onLoginSuccess(method, response) {

    this.closeModal();
    this.setState({
      loggedIn: method,
      loading: false
    })
  }

  //upon login fail, keeps pop up open and gives error 
  onLoginFail(method, response) {

    this.setState({
      loading: false,
      error: response
    })
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  //error state after changing tabs for sign in/up
  afterTabsChange() {
    this.setState({
      error: null,
    });
  }

  //sets state to make login pop up not visible
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  render() {
    
    const loggedIn = this.state.loggedIn;

    const isLoading = this.state.loading;

    //renders the main button that triggers the pop up
    //default states for pop up are set, fill in fields for user
    //are defined (email, password, name, etc.)
    return (
      <div>

        <button
        className="button-right"
          onClick={() => this.openModal('login')}
        >
          Sign In / Sign Up
        </button>

        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={isLoading}
          initialTab={this.state.initialTab}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),

            loginBtn: {
              label: "Sign in"
            },
            registerBtn: {
              label: "Sign up"
            },

            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'First name',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'firstname',
                name: 'firstname',
                placeholder: 'First name',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Last name',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'lastname',
                name: 'lastname',
                placeholder: 'Last name',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Confirm Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'confirmPass',
                name: 'confirmPass',
                placeholder: 'Re-Type Password',
              }
            ],

          }}

        />
        {loggedIn}
      </div>
    )
  }
}

export default SignModal;
