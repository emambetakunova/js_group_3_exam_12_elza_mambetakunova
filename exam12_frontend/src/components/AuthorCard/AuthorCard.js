import React from 'react';
import {Col, Row, Card, CardBody, CardTitle, Button} from "reactstrap";

import GalleryThumbnail from "../GalleryThumbnail/GalleryThumbnail";

const AuthorCard = props => {
    return (
        <Row>
            <Col md="10">
                <Card color="info" className="mb-5">
                    <CardBody>
                        <GalleryThumbnail image={props.image}/>
                        <CardTitle><strong>Title: {props.title}</strong></CardTitle>
                        {props.user === props.user._id ?
                        <CardTitle>
                            <Button type="submit" color="secondary" onClick={props.delete}>Delete</Button>
                        </CardTitle> : null}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AuthorCard;