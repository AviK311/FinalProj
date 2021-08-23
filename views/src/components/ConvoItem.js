import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import ChatForm from "./ChatForm";
import MyModal from "./MyModal";
import getCookie from "../common";
class ConvoItem extends Component {
        render() {
                const {manName, distName} = this.props.item;
                return (

                        <Card>
                                <Card.Header>Conversation between {manName} and {distName}</Card.Header>
                                <Card.Body>
                                        <MyModal str="Chat"
                                                content={(show, close) =>
                                                (<ChatForm
                                                        showModal={show}
                                                        onClose={close}
                                                        sender={getCookie("name")}
                                                        receiver={getCookie("name")===manName?
                                                        distName:
                                                        manName}
                                                />)}
                                        />
                                </Card.Body>
                        </Card>
                );

        }
}

export default ConvoItem;