import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={"input"} name={"email"} type={"email"} placeholder={"Login"}/>
        </div>
        <div>
            <Field component={"input"} name={"password"} type={"password"} placeholder={"Password"}/>
        </div>
        <div>
            <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

class Login extends Component {
    render() {

        const onSubmit = (formData) => {
            console.log(formData)
        };

        return <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
    }
}

export default Login;