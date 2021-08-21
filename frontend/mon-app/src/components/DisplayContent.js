// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/content/',
  headers: {
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Composant permettant d'afficher les articles
class DisplayContent extends Component {
  state = {
    contents: []
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.getContents();
  }
  // Requête permettant de récupérer tous les articles
  getContents = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ contents: data });
  };

  render() {
    return (
      <div>
        {this.state.contents.map(content => (
          <div className='containerArticles' key={content.id}>
            <Card className='text-center'>
              <Card.Header>{content.User.username}</Card.Header>
              <Card.Body>
                <Card.Title>{content.title}</Card.Title>
                <Card.Text>{content.content}</Card.Text>
                <Link to={'/article/' + content.id}>Accéder au topic</Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayContent;
