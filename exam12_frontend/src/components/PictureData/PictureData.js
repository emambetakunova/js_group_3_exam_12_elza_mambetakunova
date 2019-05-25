import React from 'react';
import {Col, Row, Card, CardBody, Button, CardTitle} from "reactstrap";
import GalleryThumbnail from "../GalleryThumbnail/GalleryThumbnail";

const PictureData = props => {
    return (
        <Row>
            <Col md="10">
                <Card color="info" className="mb-5">
                    <CardBody>
                        <GalleryThumbnail image={props.image}/>
                        <CardTitle>
                            <Button onClick={props.close}>Close</Button>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default PictureData;