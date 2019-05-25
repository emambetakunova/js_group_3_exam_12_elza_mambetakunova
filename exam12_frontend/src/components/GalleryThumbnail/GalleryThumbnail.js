import React from "react";
import {apiURL} from "../../constants";


const styles = {
    width: '150px',
    height: '150px',
    marginBottom: '20px'
};

const GalleryThumbnail = props => {

    let image = null;

    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
        return <img src={image} style={styles} className="img-thumbnail" alt="galleryImage" />
    }
    return null;

};

export default GalleryThumbnail;