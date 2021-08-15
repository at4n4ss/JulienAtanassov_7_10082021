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
const params = new URLSearchParams();
params.append('dataUser', localStorage.getItem('userId'));

// Composant permettant l'affichage des articles de l'utilisateur
class DisplayUserContents extends Component {
  state = {
    contents: []
  };
  constructor(props) {
    super(props);
    this.getUserContents();
  }
  getUserContents = async () => {
    let data = await api.post('/', params).then(({ data }) => data);
    this.setState({ contents: data });
  };

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
                    <Button variant='primary'>Supprimer</Button>
                  </Card.Body>
                  <Card.Footer className='text-muted'>2 days ago</Card.Footer>
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
