import React, {Component} from "react";
import styles from './NewMessage.module.css';
import sendImg from "./../../../img/paper-plane-1.png"
import {Field, reduxForm} from "redux-form";

const NEW_MESSAGE = "newMessage";

const NewMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.createNewMessageBlock}>
            <div className={styles.textareaBlock}>
                <Field component={"textarea"} name={"newMessage"} type={"text"} placeholder={"New message"}/>
            </div>
            <div className={styles.btnBlock}>
                <button><img src={sendImg} alt={'sendIMG'}/></button>
            </div>
        </form>
    )
};

const NewMessageReduxForm = reduxForm({form: NEW_MESSAGE})(NewMessageForm);


class NewMessage extends Component {
    render() {

        const onSubmit = data => {
            console.log(data);
            this.props.addMessage(data[NEW_MESSAGE]);
        };

        return (
            <NewMessageReduxForm onSubmit={onSubmit} />
        )
    }
}

export default NewMessage;