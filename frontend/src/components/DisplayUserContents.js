// Imports
import React, { Component } from 'react';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/content/me/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Paramètres DisplayUserContents
const params = new URLSearchParams();
params.append('dataUser', localStorage.getItem('userId'));

// Composant permettant l'affichage des articles de l'utilisateur
class DisplayUserContents extends Component {
  state = {
    contents: []
  };

  componentDidMount() {
    this.getUserContents();
  }
  // Requête permettant de récupérer les articles de l'utilisateur
  getUserContents = async () => {
    let data = await api.post('/', params).then(({ data }) => data);
    if (data) {
      this.setState({ contents: data });
    }
  };

  // Requête permettant de supprimer le contenu selectionné par l'utilisateur
  async postDeleteContent(contentId) {
    const paramsId = new URLSearchParams();
    paramsId.append('contentId', contentId);
    await api.post('/comment/delete', paramsId).catch();
    await api.post('/delete', paramsId).catch();
  }
  async deleteUserContent(contentId) {
    await this.postDeleteContent(contentId)
      .then(() => this.getUserContents())
      .then(() => {
        window.location.reload();
      });
  }
  render() {
    return (
      <div>
        <Container id='boxContent'>
          <div className='contentContainer'>
            {this.state.contents.map(content => (
              <div key={content.id}>
                <div className='cardElement'></div>
                <Card className='text-center'>
                  <Card.Body>
                    <Card.Title>{content.title}</Card.Title>
                    <Card.Text>{content.content}</Card.Text>
                    <div className='buttonContainer'>
                      <Button
                        onClick={() => this.deleteUserContent(content.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
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

export default DisplayUserContents;
