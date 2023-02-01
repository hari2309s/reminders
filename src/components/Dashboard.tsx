import styled from '@emotion/styled';
import * as React from 'react';
import { TabTypes } from '../constants';
import {
  Reminder,
  selectReminders,
} from '../store/features/reminders/remindersSlice';
import { selectView } from '../store/features/ui/uiSlice';
import { useAppSelector } from '../store/hooks';
import CreateModal from './CreateModal';
import NoDataAvailable from './NoDataAvailable';
import ReminderCard from './ReminderCard';
import Tabs from './Tabs';
import create from '../assets/create.png';
import DeleteModal from './DeleteModal';

const Dashboard = () => {
  const currentView = useAppSelector(selectView);
  const reminders = useAppSelector(selectReminders);

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [filteredReminders, setFilteredReminders] = React.useState<Reminder[]>(
    []
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState<string>('');

  React.useEffect(() => {
    let filtered;

    switch (currentView) {
      case TabTypes.done:
        filtered = reminders.filter(
          (reminder: Reminder) => reminder.done === true
        );
        break;
      case TabTypes.pending:
        filtered = reminders.filter(
          (reminder: Reminder) => reminder.done === false
        );
        break;
      case TabTypes.all:
      default:
        filtered = reminders;
    }
    setFilteredReminders(filtered);
  }, [currentView, reminders]);

  return (
    <Container>
      <Wrapper>
        <Tabs />
        <CreateButton
          onClick={() => setIsModalOpen(true)}
          data-testid="create-button"
          aria-label="Create"
        >
          <img src={create} alt="create" />
          Create
        </CreateButton>
      </Wrapper>
      {reminders.length > 0 ? (
        <Reminders>
          {filteredReminders.map((reminder: Reminder) => (
            <ReminderCard
              key={reminder.id}
              {...reminder}
              setShowDeleteModal={setShowDeleteModal}
            />
          ))}
        </Reminders>
      ) : (
        <NoDataAvailable />
      )}
      {isModalOpen && <CreateModal setIsOpen={setIsModalOpen} />}
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
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
  alignItems: 'center',
  paddingBottom: '20px',
});

const Reminders = styled.div({
  marginTop: '30px',
  display: 'grid',
  gridTemplateRows: '18rem 1fr',
  gridTemplateColumns: '21rem 1fr',
});

const CreateButton = styled.button({
  height: '40px',
  width: '150px',
  backgroundColor: '#615344',
  color: 'white',
  border: 0,
  outline: 0,
  borderRadius: '5px',
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
