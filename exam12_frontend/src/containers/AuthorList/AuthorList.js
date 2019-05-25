import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {deletePicture, fetchGallery} from "../../store/actions/galleryActions";

import AuthorCard from "../../components/AuthorCard/AuthorCard";


class AuthorList extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchGallery(id);
    }

    goDelete = id => {
        this.props.deletePicture(id);
        this.props.history.push({
            pathname: '/'
        })
    };

    render() {
        const authorPictures = this.props.pictures.filter(picture =>
            picture.user._id === this.props.match.params.id
        );
        let pictures = this.props.pictures;
        if (pictures.length === 0) {
            pictures = <h2>Please, log in!</h2>;
        } else {
            pictures = authorPictures.map(picture => (
                <AuthorCard
                    key={picture._id}
                    user={this.props.user._id}
                    image={picture.image}
                    title={picture.title}
                    delete={() => this.goDelete(picture._id)}
                />
            ));
        }
        return (
            <Fragment>
                {/*<h3>{this.props.user.displayName}</h3>*/}
                <CardColumns>
                    {pictures}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        pictures: state.gallery.pictures,
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGallery: () => dispatch(fetchGallery()),
        deletePicture: id => dispatch(deletePicture(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);