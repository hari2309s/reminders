import styled from '@emotion/styled';
import * as React from 'react';
import Tabs from './Tabs';
import create from '../assets/create.png';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <Container>
      <Wrapper>
        <Tabs />
        <CreateButton
          onClick={() => setIsModalOpen(true)}
          data-testid="create-button"
        >
          <img src={create} alt="create" />
          Create
        </CreateButton>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  color: '#3d4d4a',
});

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const CreateButton = styled.button({
  height: '40px',
  width: '150px',
  backgroundColor: '#a99276',
  color: 'white',
  border: 0,
  outline: 0,
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '18px',
  margin: '3px 0 0 20px',

  '> img': {
    height: '20px',
    width: '20px',
    paddingRight: '10px',
    marginBottom: '-4px',
    color: 'white',
  },
});

export default Dashboard;
