// Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
var qs = require('qs');
const api = axios.create({
  baseURL: 'http://localhost:3002/api/comment/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

// Composant permettant d'afficher les commentaires d'un article
class DisplayComments extends Component {
  state = {
    contents: []
  };
  getContentId = async () => {
    const contentId = qs.parse(this.props.match.params, {
      ignoreQueryPrefix: true
    }).id;

    const params = new URLSearchParams();
    params.append('contentId', contentId);

    let data = await api.post('/', params).then(({ data }) => data);
    this.setState({ contents: data });
  };

  componentDidMount() {
    this.getContentId();
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
                  <Card.Header>{content.User.username}</Card.Header>
                  <Card.Body>
                    <Card.Text>{content.contentComment}</Card.Text>
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

export default withRouter(DisplayComments);
