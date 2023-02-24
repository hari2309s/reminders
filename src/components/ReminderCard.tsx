import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import { useCountDownHook } from '../hooks/countDownHook';
import {
  Reminder,
  updateReminder,
} from '../store/features/reminders/remindersSlice';
import { useAppDispatch } from '../store/hooks';

interface ReminderCardProps extends Reminder {
  setShowDeleteModal: Dispatch<SetStateAction<string>>;
}

const ReminderCard = (props: ReminderCardProps) => {
  const { id, what, when, who, done, setShowDeleteModal } = props;

  const { countDown } = useCountDownHook(when);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    setShowDeleteModal(id);
  };

  const handleDone = () => {
    dispatch(updateReminder(id));
  };

  return (
    <Card data-testid="reminder-card" done={done}>
      <CountDown>in {countDown}</CountDown>
      <Title data-testid="reminder-name">{what}</Title>
      <Who>{`${who.charAt(0).toUpperCase()}${who.substring(1)}`}</Who>
      <Divider />
      <Actions done={done}>
        <button
          onClick={handleDelete}
          data-testid="delete-button"
          disabled={done}
        >
          Delete
        </button>
        <button onClick={handleDone} data-testid="done-button" disabled={done}>
          Mark as done
        </button>
      </Actions>
    </Card>
  );
};

const Card = styled.div<{ done: boolean }>((props) => ({
  padding: '5px 20px',
  borderRadius: '5px',
  backgroundColor: props.done ? 'rgba(97,83,68,0.7)' : '#F2D0A9',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '250px',
  height: '200px',
  transition: 'transform .2s',

  '&:hover': {
    cursor: props.done ? 'not-allowed' : 'pointer',
    transform: props.done ? 'none' : 'scale(1.1)',
  },

  '> *': {
    padding: 5,
  },
}));

const CountDown = styled.span({
  alignSelf: 'end',
});

const Title = styled.span({
  fontWeight: 500,
  fontSize: 25,
  alignSelf: 'start',
});

const Who = styled.span({
  alignSelf: 'end',
});

const Divider = styled.div({
  margin: '10px 0 5px',
  borderTop: '2px solid #796855',
});

const Actions = styled.div<{ done: boolean }>((props) => ({
  display: 'flex',

  '> button': {
    width: '100px',
    height: '30px',
    border: 'none',
    borderRadius: '2px',
    color: 'white',
    marginLeft: '10px',
    transition: 'transform .2s',

    '&:hover': {
      cursor: props.done ? 'not-allowed' : 'pointer',
      transform: props.done ? 'none' : 'scale(1.1)',
    },
  },

  '> button:nth-of-type(1)': {
    backgroundColor: props.done ? 'rgba(255,0,0,0.5)' : 'red',
  },

  '> button:nth-of-type(2)': {
    backgroundColor: props.done ? 'rgba(0,128,0,0.5)' : 'green',
  },
}));

export default ReminderCard;
