import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/comment/new/',

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Fonction permettant de créer un commentaire
const CreateComment = () => {
  const [contentLog, setContentLog] = useState('');
  let userId = localStorage.getItem('userId');
  let contentId = useParams().id;
  console.log(contentId);

  const PostComment = e => {
    const params = new URLSearchParams();
    params.append('contentId', contentId);
    params.append('userData', userId);
    params.append('contentComment', contentLog);
    api
      .post('/', params)
      .then(alert('Commentaire ajouté !'))
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container id='boxContent'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicComment'>
            <Form.Label>Commentaires</Form.Label>
            <Form.Control
              type='text'
              onChange={e => {
                setContentLog(e.target.value);
              }}
              placeholder='Contenu de votre commentaire'
            />
          </Form.Group>

          <Button onClick={PostComment} variant='primary' type='submit'>
            Ajouter un commentaire
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateComment;
