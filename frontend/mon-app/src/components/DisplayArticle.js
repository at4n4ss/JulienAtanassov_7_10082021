// Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
var qs = require('qs');
const api = axios.create({
  baseURL: 'http://localhost:3002/api/content/id',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});
// Composant permettant d'afficher un article selon son id
class DisplayArticle extends Component {
  getContentId = async () => {
    const contentId = qs.parse(this.props.match.params, {
      ignoreQueryPrefix: true
    }).id;
    const params = new URLSearchParams();
    params.append('contentId', contentId);

    let data = await api.post('/', params).then(({ data }) => data);
    this.setState({ article: data });
  };

  constructor(props) {
    super(props);
    this.state = {
      article: { title: null, id: null, content: null }
    };
    this.getContentId();
  }

  render() {
    return (
      <div>
        <Container id='boxContent'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>
                <h2>{this.state.article.title}</h2>
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                <h2>{this.state.article.content}</h2>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(DisplayArticle);
