import styled from '@emotion/styled';
import React from 'react';
import noData from '../assets/no-data.png';

const NoDataAvailable = () => {
  return (
    <Container>
      <img src={noData} alt="no-data" />
      <span>No reminders available!</span>
    </Container>
  );
};

const Container = styled.div({
  margin: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '> img': {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
  },

  '> span': {
    marginLeft: '-15px',
  },
});

export default NoDataAvailable;
