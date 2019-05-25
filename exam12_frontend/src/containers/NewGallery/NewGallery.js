import React, {Component, Fragment} from 'react';
import GalleryForm from "../../components/GalleryForm/GalleryForm";
import {createPicture} from "../../store/actions/galleryActions";
import {connect} from "react-redux";

class NewArtist extends Component {

    createPictureToGallery = galleryData => {
        this.props.createPicture(galleryData).then(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New picture</h2>
                <GalleryForm
                    onSubmit={this.createPictureToGallery}
                />
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    createPicture: galleryData => dispatch(createPicture(galleryData))
});

export default connect(null, mapDispatchToProps)(NewArtist);