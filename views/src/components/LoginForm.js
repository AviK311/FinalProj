import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";
import {modals, defaultButtonStyle} from "./Styles"

class LoginForm extends Component {
        state = {
                showModal: false,
                username: "",
                password: "",
        }

        onSubmit = () => {
                console.log("fetching");
                fetch("/users/authenticate", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                name: this.state.username,
                                password: this.state.password,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        console.log("Login Successful");
                                        this.props.loginFunc(data.isAuth);

                                } else {
                                        console.log("Error:", data.message);

                                }
                        })
                        .catch(() => { });
        };



        onChange = e => {
                if (e.target.id == "login-name")
                        this.setState({ username: e.target.value });
                else
                        this.setState({ password: e.target.value });
        }



        renderLogin = () => {
                return (
                        <div>
                                <form className="form-horizontal form-loanable">
                                        <fieldset>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="login-email" className="col-sm-5">Username</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="email"
                                                                        id="login-name"
                                                                        className="form-control"
                                                                        placeholder="Enter username"
                                                                        onChange={this.onChange}
                                                                        value={this.state.username}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="login-password" className="col-sm-5">Password</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <div className="login-password-wrapper">
                                                                        <input
                                                                                type="password"
                                                                                name="password"
                                                                                id="login-password"
                                                                                className="form-control"
                                                                                placeholder="*****"
                                                                                required
                                                                                onChange={this.onChange}
                                                                                value={this.state.password}
                                                                        />
                                                                </div>
                                                        </div>
                                                </div>
                                        </fieldset>
                                        <div className="form-action">
                                                <Button style={defaultButtonStyle}
                                                        className="btn btn-lg btn-primary btn-left" onClick={this.onSubmit}>Enter <span className="icon-arrow-right2 outlined"></span></Button>
                                        </div>
                                </form>

                        </div>
                );
        };

        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true} style={modals}>
                                                <h2>Login</h2>
                                        </Modal.Header>
                                        <Modal.Body style={modals}>
                                                {this.renderLogin()}
                                        </Modal.Body>
                                        <Modal.Footer style={modals}>
                                                <Button style={defaultButtonStyle} onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default LoginForm;
