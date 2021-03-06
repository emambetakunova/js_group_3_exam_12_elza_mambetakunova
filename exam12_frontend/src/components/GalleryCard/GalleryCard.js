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
                        <CardTitle>
                            <Button onClick={props.getPictureId}>More...</Button>
                        </CardTitle>
                        <CardTitle><strong>Title: {props.title}</strong></CardTitle>
                        <CardTitle onClick={props.authorGallery}><strong>Author: {props.author}</strong></CardTitle>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default GalleryCard;