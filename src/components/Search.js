import React, { useState } from "react";

import { Group, Cell, Card, Search } from "@vkontakte/vkui";

import "./Search.css";

const SearchHeader = ({ go }) => {
  const [search, setSearch] = useState("");
  const [words, setWords] = useState([]);

  const findWords = (e) => {
    e.persist();
    const word = e.target.value;
    setSearch(word);

    if (word.length > 1) {
      fetch(`https://texton.me/api/words/v1/${word}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWords(data);
        });
    } else {
      setWords([]);
    }
  };

  return (
    <Group separator="hide">
      <Search
        placeholder="Введите слово для поиска"
        value={search}
        onChange={findWords}
        after={null}
      />
      {words.length > 0 && (
        <Card mode="shadow" className="SearchHeader">
          {words.map((word) => (
            <Cell
              onClick={() => {
                setWords([]);
                go("word", { word: word.word });
              }}
              key={word.IID}
            >
              <div className="SearchHeader__Word">{word.word}</div>
            </Cell>
          ))}
        </Card>
      )}
    </Group>
  );
};

export default SearchHeader;
