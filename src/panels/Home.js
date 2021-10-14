import React from "react";
import { Panel, PanelHeader, Header, Group, Cell } from "@vkontakte/vkui";

import SearchHeader from "../components/Search";

const POPULAR = [
  { id: 1, word: "врач" },
  { id: 2, word: "контроль" },
  { id: 3, word: "эмоция" },
  { id: 4, word: "безумный" },
  { id: 5, word: "вода" },
  { id: 6, word: "город" },
];

const Home = ({ id, go }) => {
  const shuffled = POPULAR.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <Panel id={id}>
      <PanelHeader>Синонимы и антонимы — TextOn.me</PanelHeader>
      <SearchHeader go={go} />
      <Group header={<Header mode="secondary">Часто ищут</Header>}>
        {shuffled.map((item) => (
          <Cell key={item.id} onClick={() => go("word", { word: item.word })}>
            <span className="LinkButton">{item.word}</span>
          </Cell>
        ))}
      </Group>
    </Panel>
  );
};

export default Home;
