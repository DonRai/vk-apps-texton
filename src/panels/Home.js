import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import SearchHeader from '../components/Search';

const POPULAR = [
  { id: 1, word: 'врач' },
  { id: 2, word: 'контроль' },
  { id: 3, word: 'эмоция' },
  { id: 4, word: 'безумный' },
  { id: 5, word: 'вода' },
  { id: 6, word: 'город' },
];

const Home = ({ id, go }) => {
  return(
    <Panel id={id}>
      <PanelHeader>Синонимы и антонимы</PanelHeader>
      <SearchHeader go={go} />
      <Group header={<Header mode="secondary">Часто ищут</Header>}>
        {POPULAR.map((item) => (
          <Cell 
            key={item.id} 
            onClick={() => go('word', {word: item.word})}
          >
            <span className="LinkButton">{item.word}</span>
          </Cell>
        ))}
      </Group>
    </Panel>
  )
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
