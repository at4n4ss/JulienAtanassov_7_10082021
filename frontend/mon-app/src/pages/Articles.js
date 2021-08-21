// Imports
import Navigation from '../components/Navigation.';
import DisplayContent from '../components/DisplayContent';
import IsNotConnected from '../components/IsNotConnected';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

// Page Articles

const Articles = () => {
  return (
    <div className='articles'>
      <Navigation />
      <Container>
        <Container>
          <div className='containerArticles'>
            <div className='containerArticlesTitle'>
              <div className='containerTitleArticles'>
                <h2>
                  Participez aux forums ou créez le votre dans votre page
                  profile!
                </h2>
              </div>
            </div>
            <div>
              <DisplayContent />
            </div>
          </div>
        </Container>
      </Container>
      <IsNotConnected />
    </div>
  );
};
export default Articles;
