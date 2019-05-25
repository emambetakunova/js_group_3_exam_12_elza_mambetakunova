import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logOutUser} from "./store/actions/userActions";
import Routes from "./Routes";


class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar
                        user={this.props.user}
                        logout={this.props.logOutUser}
                    />
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Routes user={this.props.user}/>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logOutUser: () => dispatch(logOutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
