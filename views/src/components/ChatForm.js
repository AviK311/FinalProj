import React, { Component } from "react";
import getCookie from "../common";
import ListGroup from 'react-bootstrap/ListGroup'


import {
        Button,
        Modal,
} from "react-bootstrap";
import ChatItem from "./ChatItem";

class ChatForm extends Component {
        state = {
                chatMessage: "",
                endpoint: 'localhost:8072/',
                messages: [],
                sender: '',
                receiver: '',
                d2m: getCookie("userType") === "D"
        }
        componentDidMount = () => {


                let f = () => {
                        fetch("/messages/convo", {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(this.state.d2m ?
                                        {
                                                mName: this.state.receiver,
                                                dName: this.state.sender
                                        } :
                                        {
                                                mName: this.state.sender,
                                                dName: this.state.receiver
                                        }),
                        })
                                .then((res) => res.json())
                                .then((data) => {
                                        //loading(false);
                                        if (data.success) {
                                                this.setState({ messages: data.convo });
                                        }

                                })
                                .catch();
                }
                this.setState({
                        sender: this.props.sender,
                        receiver: this.props.receiver,
                }, f);

        }

        send = (e) => {
                e.preventDefault();
                let newMessage = {
                        type: 'send',
                        content: this.state.chatMessage,
                        name: getCookie("name"),
                }

                // let sendMessage = {...newMessage};
                // sendMessage.type = "receive";
                fetch("/messages/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                text: this.state.chatMessage,
                                mName: this.state.d2m ? this.state.receiver : this.state.sender,
                                dName: this.state.d2m ? this.state.sender : this.state.receiver,
                                isNew: this.state.messages.length === 0
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        let arr = this.state.messages;
                                        arr.push(data.newMessage);
                                        this.setState({ messages: arr, chatMessage: '' });
                                }

                        })
                        .catch();
        }




        handleChange = e => {
                this.setState({ chatMessage: e.target.value });
        }


        renderDetails = () => {
                return (
                        <form onSubmit={this.send}>
                                <label>
                                        Message:
                                        <textarea value={this.state.chatMessage} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                        </form>
                );
        }

        renderConvo = () => {
                return (<ListGroup>
                        {this.state.messages.map(m => <ListGroup.Item><ChatItem item={m} /></ListGroup.Item>)}
                </ListGroup>)
        }
        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true}>
                                                <h2>Chat with {this.props.destname}</h2>
                                        </Modal.Header>
                                        <Modal.Body>
                                                {this.renderConvo()}
                                        </Modal.Body>
                                        <Modal.Body>

                                                {this.renderDetails()}
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <Button onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default ChatForm;