import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import state from "./redux/state";
import {addPost} from "./redux/state";

//addPost('Hello, it is a new message');

/*ReactDOM.render(<App postData = {state.postData}  dialogData = {state.dialogData} messagesData = {state.messagesData}/>,
                document.getElementById('root'));*/
ReactDOM.render(<App state = { state } addPost = { addPost }/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
