import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";

import {connect} from "react-redux";
import {facebookLogin} from "../../store/actions/userActions";
import {NotificationManager} from "react-notifications";

class FacebookLogin extends Component {
    facebookLogin = data => {
        if (data.error) {
            NotificationManager.error('Something went wrong!');

        } else if(!data.name){
            NotificationManager.warning('You pressed cancelled!');
        } else{
            this.props.fbLogin(data);
        }

    };

    render() {
        return (
            <div>
                <FacebookLoginButton
                    appId="723759694703408"
                    callback={this.facebookLogin}
                    fields="name, email, picture"
                    render={renderProps => (
                        <Button color="primary" onClick={renderProps.onClick}>Login with facebook</Button>
                    )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fbLogin: userData => dispatch(facebookLogin(userData))
});

export default connect(null, mapDispatchToProps)(FacebookLogin);