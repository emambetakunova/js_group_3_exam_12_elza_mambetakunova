import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchGallery, fetchPictureId, closeModal} from "../../store/actions/galleryActions";

import GalleryCard from "../../components/GalleryCard/GalleryCard";
import {CardColumns} from "reactstrap";
import Modal from "../../components/UI/Modal/Modal";
import PictureData from "../../components/PictureData/PictureData";

class Gallery extends Component {
    componentDidMount() {
        this.props.fetchGallery();
    }

    getPicture = id => {
        this.props.history.push({
            pathname: '/gallery/' + id
        })
    };

    getAuthorGallery = id => {
        this.props.history.push({
            pathname: '/gallery/?author=' + id
        })
    };

    getPictureId = id => {
        this.props.fetchPictureId(id);
    };

    render() {
        let pictures = this.props.pictures;
        if (pictures.length === 0) {
            pictures = <h2>Add new picture</h2>;
        } else {
            pictures = this.props.pictures.map(picture => (
                <GalleryCard
                    key={picture._id}
                    title={picture.title}
                    image={picture.image}
                    getPictureId={() => this.getPictureId(picture._id)}
                    author={picture.user.displayName}
                    authorGallery={() => this.getAuthorGallery(picture.user._id)}
                    user={this.props.user}
                    picture={picture}
                    onClick={() => this.getPicture(picture._id)}/>
            ));
        }

        return (
            <Fragment>
                <h1>Gallery</h1>
                <CardColumns>
                    {pictures}
                </CardColumns>
                <Modal
                    show={this.props.showModal}
                    close={this.props.closeModal}
                >
                    {this.props.pictureId ?
                        <PictureData
                            image={this.props.pictureId.image}
                            close={this.props.closeModal}
                        /> : null
                    }
                </Modal>

            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        pictures: state.gallery.pictures,
        showModal: state.gallery.showModal,
        pictureId: state.gallery.pictureId,
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGallery: () => dispatch(fetchGallery()),
        fetchPictureId: (id) => dispatch(fetchPictureId(id)),
        closeModal: () => dispatch(closeModal()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);