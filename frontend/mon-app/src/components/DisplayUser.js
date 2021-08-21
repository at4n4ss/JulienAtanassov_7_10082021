// Imports
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/users/me',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Composant permettant d'afficher les informations de l'utilisateur
class DisplayUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: null, id: null, email: null }
    };
    this.getUser();
  }
  // Requête permettant de récupérer les informations de l'utilisateur
  getUser = async () => {
    const params = new URLSearchParams();
    params.append('userData', localStorage.getItem('userId'));
    let data = await api.post('/', params).then(({ data }) => data);
    this.setState({ user: data });
  };

  render() {
    return (
      <div>
        <Container id='boxContent'>
          <Card className='userCard' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{this.state.user.username}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {this.state.user.email}
              </Card.Subtitle>
              <Card.Text>{this.state.user.bio}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default DisplayUser;
