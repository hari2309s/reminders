import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createReminder } from '../store/features/reminders/remindersSlice';
import { useAppDispatch } from '../store/hooks';

const participants = ['hari', 'cartman', 'kenny', 'stan'];

interface FormValues {
  name: string;
  when: string;
  who: string;
}

interface ReminderFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReminderForm = ({ setIsOpen }: ReminderFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    when: '',
    who: participants[0],
  });
  const [canCreate, setCanCreate] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues!,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCanCreate(!validateForm());
  }, [formValues]);

  const validateForm = (): boolean => {
    return Object.values(formValues).some((value) => value === '');
  };

  const handleCreate = () => {
    dispatch(
      createReminder({
        ...formValues!,
        when: (formValues.when
          ? new Date(formValues.when)
          : new Date()
        ).getTime(),
        who: formValues.who,
        createdAt: new Date().getTime().toString(),
        createdBy: 'Hari',
        id: uuidv4(),
        done: false,
      })
    );
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <h3>New reminder</h3>
      <form>
        <Field>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
            data-testid="name-input"
          />
        </Field>
        <Field>
          <label htmlFor="when">When</label>
          <input
            id="when"
            name="when"
            type="date"
            value={formValues.when}
            onChange={handleInputChange}
            data-testid="when-input"
          />
        </Field>
        <Field>
          <label htmlFor="who">Who</label>
          <select
            id="who"
            name="who"
            value={formValues.who}
            onChange={handleInputChange}
            data-testid="who-input"
          >
            {participants.map((participant) => (
              <option
                value={participant}
                data-testid="who-option"
                key={participant}
              >
                {`${participant.charAt(0).toUpperCase()}${participant.substring(
                  1
                )}`}
              </option>
            ))}
          </select>
        </Field>
        <Divider />
        <div>
          <Button
            type="button"
            onClick={handleCancel}
            data-testid="cancel-button-form"
            backgroundColor="red"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            data-testid="create-button-form"
            backgroundColor="green"
            disabled={!canCreate}
          >
            Create
          </Button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div({
  display: 'inline-block',
  minWidth: '100%',

  '> h3': {
    marginBottom: '0px',
  },

  '> form': {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    paddingBottom: '10px',
  },
});

const Field = styled.div({
  marginTop: '20px',

  '> label': {
    minWidth: '45px',
  },

  '> input': {
    marginLeft: '10px',
    minWidth: '180px',
    textAlign: 'center',
  },

  '> select': {
    marginLeft: '10px',
    minWidth: '185px',
    textAlign: 'center',
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
  backgroundColor: props.backgroundColor,
  border: 'none',
  borderRadius: '2px',
  color: 'white',
  marginLeft: '30px',
  opacity: props.disabled ? '0.5' : 1,
  cursor: 'pointer',
}));

export default ReminderForm;
