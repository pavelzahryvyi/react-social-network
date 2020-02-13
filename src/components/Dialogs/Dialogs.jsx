import React from "react";
import styles from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {

    console.log('--- Dialogs props ', props);

    let dialogData = props.dialogData;
    let messagesData = props.messagesData;

    //array of components
    let dialogsElements = dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = messagesData.map(messageItem => <Message message={messageItem.message} />);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsBlock}>

                { dialogsElements }

            </div>
            <div className={styles.messagesBlock}>

                { messagesElements }

            </div>
        </div>
    )
};

export default Dialogs;