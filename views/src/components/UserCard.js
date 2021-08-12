import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


class UserCard extends Component{

        renderManager(){
                return (<Card.Body>
                        <Card.Title>{this.props.u.name}</Card.Title>
                        <ListGroup variant="flush">
                        <ListGroup.Item>Manager</ListGroup.Item>
                        <ListGroup.Item>Phone Number: {this.props.u.phone}</ListGroup.Item>
                        </ListGroup>
                        {this.props.isManager? 
                        <Button variant="primary">Delete</Button>:
                        <Button variant="primary">Chat</Button>}
                      </Card.Body>)
                       

        }

        renderDistributer(){
                return (<Card.Body>
                        <Card.Title>{this.props.u.name}</Card.Title>
                        <ListGroup variant="flush">
                        <ListGroup.Item>Distributer</ListGroup.Item>
                        <ListGroup.Item>Phone Number: {this.props.u.phone}</ListGroup.Item>
                        <ListGroup.Item>{this.props.u.isAssigned?"Is unavailable today":"Is available today"}</ListGroup.Item>
                        </ListGroup>
                        <Button variant="primary">Delete</Button>
                      </Card.Body>);
                       

        }
        render(){
                return (
                        <Card style={{ width: '18rem' }}>
                        {this.props.u.userType=="M"?
                                this.renderManager()
                        :
                                this.renderDistributer()}
                      </Card>  
                )
        }
}

export default UserCard;