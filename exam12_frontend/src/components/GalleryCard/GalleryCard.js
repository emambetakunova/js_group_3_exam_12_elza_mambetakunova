import React from 'react';
import {Col, Row, Card, CardBody, CardTitle, Button} from "reactstrap";

import GalleryThumbnail from "../GalleryThumbnail/GalleryThumbnail";

const GalleryCard = props => {
    return (
        <Row>
            <Col md="10">
                <Card color="info" className="mb-5">
                    <CardBody>
                        <GalleryThumbnail image={props.image}/>
                        <CardTitle><strong>Title: {props.title}</strong></CardTitle>
                        <CardTitle><strong>Author: {props.author}</strong></CardTitle>
                        {props.user && props.user.role === 'author' ?
                            <CardBody>
                                <CardTitle>
                                    <Button type="submit" color="secondary" onClick={props.delete}>Delete</Button>
                                </CardTitle>
                            </CardBody> : null}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default GalleryCard;