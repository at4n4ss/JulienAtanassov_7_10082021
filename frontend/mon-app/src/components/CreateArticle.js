// Imports
import React, { useState } from 'react';
import '../styles/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/content/new/',

  headers: {
    'content-type': 'application/json',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Fonction permettant de créer un article
const CreateArticle = () => {
  const [titleLog, setTitleLog] = useState('');
  const [contentLog, setContentLog] = useState('');
  let userId = localStorage.getItem('userId');
  let data = { title: titleLog, content: contentLog, userId: userId };
  const CreateContent = e => {
    api
      .post('/', data)
      .then(alert('Article créé !'))
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container id='boxContent'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicTitle'>
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type='text'
              onChange={e => {
                setTitleLog(e.target.value);
              }}
              placeholder='Titre de votre article'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicContent'>
            <Form.Label>Contenu</Form.Label>
            <Form.Control
              type='text'
              onChange={e => {
                setContentLog(e.target.value);
              }}
              placeholder='Contenu de votre article'
            />
          </Form.Group>
          <div className='buttonContainer'>
            <Button onClick={CreateContent} variant='primary' type='submit'>
              Créer l'article
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateArticle;
