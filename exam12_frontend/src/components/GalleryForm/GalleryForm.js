import React, {Component} from 'react';
import {Form, FormGroup, Col, Button} from "reactstrap";


import FormElement from "../UI/Form/FormElement";


class GalleryForm extends Component {

    state = {
        title: '',
        image: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })

    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };


    render() {
        return (
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="title"
                        title="Title"
                        type="text"
                        required
                        placeholder="Enter picture title"
                        onChange={this.inputChangeHandler}
                        value={this.state.title}
                        error={this.fieldHasError('title')}
                    />
                    <FormElement
                        propertyName="image"
                        title="Image"
                        type="file"
                        required
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('image')}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
        );
    }
}

export default GalleryForm;