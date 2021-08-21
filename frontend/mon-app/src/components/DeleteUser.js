// Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/users/me/delete/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

class DeleteUser extends Component {
  state = {
    contents: []
  };
  constructor(props) {
    super(props);
  }

  // Fonction permettant d'envoyer la requête afin de supprimer le compte de l'utilisateur
  deleteUser = async () => {
    let userId = localStorage.getItem('userId');
    const params = new URLSearchParams();
    params.append('userInfo', userId);

    await api.post('/', params).catch();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Container id='boxContent'>
          <div className='contentContainer'>
            <div className='buttonContainer'>
              <button className='btn btn-primary' onClick={this.deleteUser}>
                Supprimer votre profil
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(DeleteUser);
