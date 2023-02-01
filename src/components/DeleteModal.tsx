import styled from '@emotion/styled';
import React from 'react';
import { deleteReminder } from '../store/features/reminders/remindersSlice';
import { useAppDispatch } from '../store/hooks';

interface DeleteModalProps {
  showDeleteModal: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch();

  const handleNoClick = () => {
    setShowDeleteModal('');
  };

  const handleYesClick = () => {
    dispatch(deleteReminder(showDeleteModal));
    setShowDeleteModal('');
  };

  return (
    <Container>
      <Modal>
        <div>
          <p>{`Are you sure you want to delete?`}</p>
          <Divider />
          <div>
            <Button
              type="button"
              data-testid="no-button-dialog"
              backgroundColor="red"
              onClick={handleNoClick}
            >
              No
            </Button>
            <Button
              type="button"
              data-testid="yes-button-dialog"
              backgroundColor="green"
              onClick={handleYesClick}
            >
              Yes
            </Button>
          </div>
        </div>
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

  '> div': {
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
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

const Divider = styled.div({
  margin: '20px 0',
  borderTop: '2px solid #796855',
});

const Button = styled.button<{ backgroundColor: string }>((props) => ({
  width: '80px',
  height: '30px',
  alignSelf: 'right',
  border: 'none',
  borderRadius: '2px',
  color: 'white',
  marginLeft: '30px',
  cursor: 'pointer',
  backgroundColor: props.backgroundColor,
}));

export default DeleteModal;
