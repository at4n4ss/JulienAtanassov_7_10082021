// Imports
import React, { Component } from 'react';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/content/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Composant permettant l'affichage des articles de l'utilisateur
class AdminContents extends Component {
  state = {
    contents: []
  };
  constructor(props) {
    super(props);
    this.getUserContents();
  }

  // Requête permettant de récupérer les articles de l'utilisateur
  getUserContents = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ contents: data });
  };

  // Requête permettant de supprimer le contenu selectionné par l'utilisateur
  async deleteUserContent(contentId) {
    const paramsId = new URLSearchParams();
    paramsId.append('contentId', contentId);
    await api.post('/me/delete', paramsId).catch();
    this.getUserContents();
  }
  render() {
    return (
      <div>
        <Container id='boxContent'>
          <div className='contentContainer'>
            <h2>Forums</h2>
            {this.state.contents.map(content => (
              <div key={content.id}>
                <div className='cardElement'></div>
                <Card className='text-center'>
                  <Card.Body>
                    <Card.Title>{content.title}</Card.Title>
                    <Card.Text>{content.content}</Card.Text>
                    <Button
                      variant='primary'
                      onClick={() => this.deleteUserContent(content.id)}
                    >
                      Supprimer
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminContents;
