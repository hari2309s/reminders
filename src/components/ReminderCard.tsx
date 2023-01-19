import styled from '@emotion/styled';
import * as React from 'react';
import {
  deleteReminder,
  Reminder,
  updateReminder,
} from '../store/features/reminders/remindersSlice';
import { useAppDispatch } from '../store/hooks';

type ReminderCardProps = Reminder;

const ReminderCard = (props: ReminderCardProps) => {
  const { id, name, when, who, createdBy, done } = props;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteReminder(id));
  };

  const handleDone = () => {
    dispatch(updateReminder(id));
  };

  return (
    <Card data-testid="reminder-card" done={done}>
      <Title data-testid="reminder-name">{name}</Title>
      <span>{when}</span>
      <span>{who}</span>
      <span>{createdBy}</span>
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
  padding: '20px',
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

const Title = styled.span({
  fontWeight: 500,
  fontSize: 25,
});

const Divider = styled.div({
  margin: '10px 0',
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
