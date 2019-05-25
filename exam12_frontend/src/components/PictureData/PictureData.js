import React from 'react';
import {Col, Row, CardBody, Button, CardTitle} from "reactstrap";
import GalleryThumbnail from "../GalleryThumbnail/GalleryThumbnail";

const PictureData = props => {
    return (
        <Row>
            <Col md="10">
                <CardBody>
                    <GalleryThumbnail image={props.image}/>
                    <CardTitle>
                        <Button onClick={props.close}>Close</Button>
                    </CardTitle>
                </CardBody>
            </Col>
        </Row>
    );
};

export default PictureData;