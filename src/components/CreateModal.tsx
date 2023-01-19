import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import ReminderForm from './ReminderForm';

interface CreateModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateModal = ({ setIsOpen }: CreateModalProps) => {
  return (
    <Container data-testid="create-modal">
      <Modal>
        <ReminderForm setIsOpen={setIsOpen} />
      </Modal>
    </Container>
  );
};

const Container = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(61, 77, 74, 0.5)',
});

const Modal = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '5px',
  width: '350px',
  boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
  background: '#F2D0A9',
  color: '#493e33',
  zIndex: '1',
  padding: '10px',
  webkitAnimationName: 'fadeIn' /* Fade in the background */,
  webkitAnimationDuration: '0.4s',
  animationName: 'fadeIn',
  animationDuration: '0.4s',

  '@-webkit-keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export default CreateModal;
