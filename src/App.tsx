import styled from '@emotion/styled';
import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Container>
      <Header>Reminders</Header>
      <Dashboard />
    </Container>
  );
};

const Header = styled.header({
  color: '#1f2725',
  fontWeight: 600,
  fontSize: '30px',
});

const Container = styled.div({
  padding: '30px 30px 10px',
  textAlign: 'center',
});

export default App;
