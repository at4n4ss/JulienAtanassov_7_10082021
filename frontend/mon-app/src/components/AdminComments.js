// Imports
import React, { Component } from 'react';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/comment/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Composant permettant l'affichage des articles de l'utilisateur
class AdminComments extends Component {
  state = {
    comments: []
  };
  constructor(props) {
    super(props);
    this.getUserComments();
  }

  // Requête permettant de récupérer les articles de l'utilisateur
  getUserComments = async () => {
    let data = await api.get('/all/').then(({ data }) => data);
    this.setState({ comments: data });
  };

  // Requête permettant de supprimer le contenu selectionné par l'utilisateur
  async deleteUserComment(commentId) {
    const paramsId = new URLSearchParams();
    paramsId.append('commentId', commentId);
    await api.post('/me/delete', paramsId).catch();
    this.getUserComments();
  }
  render() {
    return (
      <div>
        <Container id='boxContent'>
          <div className='contentContainer'>
            <h2>Commentaires</h2>
            {this.state.comments.map(comment => (
              <div key={comment.id}>
                <div className='cardElement'></div>
                <Card className='text-center'>
                  <Card.Body>
                    <Card.Text>{comment.contentComment}</Card.Text>
                    <Button
                      variant='primary'
                      onClick={() => this.deleteUserComment(comment.id)}
                    >
                      Supprimer
                    </Button>
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

export default AdminComments;
