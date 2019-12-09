import React, {Component} from 'react';
import  './SignModal.css';
import ReactModalLogin from 'react-modal-login';

class SignModal extends Component {

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

  openModal(initialTab) {
    this.setState({
      initialTab: initialTab
    }, () => {
      this.setState({
        showModal: true,
      })
    });
  }

  onLoginSuccess(method, response) {

    this.closeModal();
    this.setState({
      loggedIn: method,
      loading: false
    })
  }

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

  afterTabsChange() {
    this.setState({
      error: null,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  render() {

    const loggedIn = this.state.loggedIn;

    const isLoading = this.state.loading;

    return (
      <div>

        <button
        //   className="btn btn-outline-secondary btn-lg"
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
