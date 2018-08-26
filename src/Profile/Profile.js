import React, { Component } from 'react';
//Import Bootstrap components from react-Bootstrap
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
//Import custom CSS from Profile.css
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;

    //Check if there's a user profile, if there's none use the getProfile me!
    if(!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    //Using destructuring assignment to set the constant profile to the state.
    const { profile } = this.state;

    return (
      <div className='container'>
        <div className='profile-area'>
          <h1>{profile.name}</h1>
          <Panel header='Profile'>
            <img src={profile.picture} alt='profile' />
            <div>
              <ControlLabel><Glyphicon glyph='user' />Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
