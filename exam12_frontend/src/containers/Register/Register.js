import React, {Component, Fragment} from 'react';
import {Form, FormGroup, Col, Button, Alert} from "reactstrap";
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/userActions";
import FormElement from "../../components/UI/Form/FormElement";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Register extends Component {
    state = {
        username: '',
        password: '',
        avatarImage: '',
        displayName: ''

    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.registerUser(formData)
    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })

    };

    render() {
        return (
            <Fragment>
                <h2 className="mb-4">Register new user</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        This is a danger alert — check it out!
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormGroup row>
                        <FacebookLogin/>
                    </FormGroup>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('username')}
                        placeholder="Enter your username"
                        autoComplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('password')}
                        placeholder="Enter secure password"
                        autoComplete="new-password"
                    />
                    <FormElement
                        propertyName="displayName"
                        title="Display name"
                        type="text"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('displayName')}
                        placeholder="Enter your display name"
                        autoComplete="new-displayName"
                    />
                    <FormElement
                        propertyName="avatarImage"
                        title="Avatar"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('avatarImage')}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button type="submit" color="primary">Register</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.user.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);