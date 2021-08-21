// Imports
import React, { Component } from 'react';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/comment/me/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});
// Paramètres DisplayUserContents
const params = new URLSearchParams();
params.append('userData', localStorage.getItem('userId'));

// Composant permettant l'affichage des articles de l'utilisateur
class DisplayUserComments extends Component {
  state = {
    comments: []
  };
  constructor(props) {
    super(props);
    this.getUserComments();
  }
  componentWillMount() {
    this.deleteUserComment = this.deleteUserComment.bind(this);

    this.getUserComments();
  }
  // Requête permettant de récupérer les articles de l'utilisateur
  getUserComments = async () => {
    let data = await api.post('/', params).then(({ data }) => data);
    this.setState({ comments: data });
  };

  // Requête permettant de supprimer le contenu selectionné par l'utilisateur
  async deleteUserComment(commentId) {
    const paramsId = new URLSearchParams();
    paramsId.append('commentId', commentId);
    await api
      .post('/delete', paramsId)
      .then(() => this.getUserComments())
      .then(() => {
        window.location.reload();
      })
      .catch();
  }
  render() {
    return (
      <div>
        <Container id='boxContent'>
          <div className='contentContainer'>
            {this.state.comments.map(comment => (
              <div key={comment.id}>
                <div className='cardElement'></div>
                <Card className='text-center'>
                  <Card.Body>
                    <Card.Text>{comment.contentComment}</Card.Text>
                    <div className='buttonContainer'>
                      <Button
                        variant='primary'
                        onClick={() => this.deleteUserComment(comment.id)}
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

export default DisplayUserComments;
