import styled from '@emotion/styled';
import React from 'react';
import all from '../assets/all.png';
import done from '../assets/done.png';
import pending from '../assets/pending.png';
import { TabTypes } from '../constants';
import { changeView, selectView } from '../store/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const tabTypes = ['All', 'Done', 'Pending'];

const getIcon = (tab: TabTypes) => {
  switch (tab) {
    case TabTypes.all:
      return all;
    case TabTypes.done:
      return done;
    case TabTypes.pending:
      return pending;
    default:
      return '';
  }
};

const Tabs = () => {
  const currentView = useAppSelector(selectView);
  const dispatch = useAppDispatch();

  return (
    <TabsGroup>
      {tabTypes.map((type) => (
        <Tab
          key={type}
          active={currentView === type}
          onClick={() => dispatch(changeView(type as TabTypes))}
          data-testid={`${type}-option`}
        >
          <img src={getIcon(type as TabTypes)} alt={type} />
          {type}
        </Tab>
      ))}
    </TabsGroup>
  );
};

const Tab = styled.button<{ active: boolean }>((props) => ({
  fontSize: '20px',
  padding: '10px 60px',
  cursor: 'pointer',
  opacity: props.active ? 1 : 0.6,
  background: '#5c746f',
  color: 'white',
  border: 0,
  outline: 0,
  borderBottom: props.active ? '2px solid #1f2725' : 0,

  '> img': {
    height: '20px',
    width: '20px',
    paddingRight: '10px',
    marginBottom: '-4px',
  },
}));

const TabsGroup = styled.div({
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '5px',
  paddingBottom: '20px',
});

export default Tabs;
