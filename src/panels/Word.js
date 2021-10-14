import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Panel,
  PanelHeader,
  Title,
  PanelHeaderBack,
  Group,
  Cell,
  List,
  Snackbar,
  Avatar,
  InfoRow,
  Tabs,
  TabsItem,
  HorizontalScroll,
  PanelSpinner,
} from "@vkontakte/vkui";
import { Icon24Copy, Icon16Done } from "@vkontakte/icons";

import SearchHeader from "../components/Search";
import "./Word.css";

const Word = ({ id, options, go }) => {
  const [wordData, setWordData] = useState({
    antonyms: [],
    phraseology: [],
    synonyms: [],
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (options.word) {
      setLoading(true);

      fetch(`https://texton.me/api/word/v1/${options.word}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWordData(data);
          setActiveTab(1);
          setLoading(false);
        })
        .catch(() => {
          setWordData({ antonyms: [], phraseology: [], synonyms: [] });
          setActiveTab(1);
          setLoading(false);
        });
    }
  }, [options.word]);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("home", {})} />}>
        Синонимы и антонимы — TextOn.me
      </PanelHeader>
      <SearchHeader go={go} />

      {loading ? (
        <PanelSpinner />
      ) : (
        <>
          <Cell disabled>
            <Title level="1" weight="semibold">
              {options.word}
            </Title>
          </Cell>

          <Tabs mode="default">
            <HorizontalScroll>
              <TabsItem
                selected={activeTab === 1}
                onClick={() => setActiveTab(1)}
              >
                Синонимы
              </TabsItem>
              {wordData.antonyms.length > 0 && (
                <TabsItem
                  selected={activeTab === 2}
                  onClick={() => setActiveTab(2)}
                >
                  Антонимы
                </TabsItem>
              )}
              {wordData.phraseology.length > 0 && (
                <TabsItem
                  selected={activeTab === 3}
                  onClick={() => setActiveTab(3)}
                >
                  Фразеологизмы
                </TabsItem>
              )}
              <TabsItem
                selected={activeTab === 4}
                onClick={() => setActiveTab(4)}
              >
                Морфологический разбор
              </TabsItem>
            </HorizontalScroll>
          </Tabs>

          {activeTab === 1 && (
            <Group>
              {wordData.synonyms.length > 0 &&
                wordData.synonyms.map((item) => (
                  <Cell
                    key={item.s_id}
                    description={item.syn.split(",").join(", ")}
                    disabled
                    before={
                      <CopyToClipboard text={item.word} onCopy={copy}>
                        <Icon24Copy />
                      </CopyToClipboard>
                    }
                  >
                    <span
                      className="LinkButton"
                      onClick={() => go("word", { word: item.word })}
                    >
                      {item.word}
                    </span>
                  </Cell>
                ))}
            </Group>
          )}

          {activeTab === 2 && (
            <Group>
              {wordData.antonyms.length > 0 &&
                wordData.antonyms.map((item, index) => (
                  <Cell
                    key={`${item.IID}-${item.word}-${item.wcase}-${index}`}
                    description={
                      item.gender ? <span>{item.gender}. р.</span> : null
                    }
                    disabled
                    before={
                      <CopyToClipboard text={item.word} onCopy={copy}>
                        <Icon24Copy />
                      </CopyToClipboard>
                    }
                  >
                    <span
                      className="LinkButton"
                      onClick={() => go("word", { word: item.word })}
                    >
                      {item.word}
                    </span>
                  </Cell>
                ))}
            </Group>
          )}

          {activeTab === 3 && (
            <Group>
              {wordData.phraseology.length > 0 &&
                wordData.phraseology.map((item) => (
                  <Cell key={item.id} disabled>
                    {item.phrase}
                  </Cell>
                ))}
            </Group>
          )}

          {activeTab === 4 && (
            <Group>
              <List>
                {wordData.type ? (
                  <Cell multiline disabled>
                    <InfoRow header="Часть речи">{wordData.type}</InfoRow>
                  </Cell>
                ) : null}
                {wordData.type_sub ? (
                  <Cell multiline disabled>
                    <InfoRow header="Подтип">{wordData.type_sub}</InfoRow>
                  </Cell>
                ) : null}
                {wordData.type_ssub ? (
                  <Cell multiline disabled>
                    <InfoRow header="Под-подтип">{wordData.type_ssub}</InfoRow>
                  </Cell>
                ) : null}

                {wordData.plural === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Число">единственное</InfoRow>
                  </Cell>
                ) : null}
                {wordData.plural === 1 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Число">множественное</InfoRow>
                  </Cell>
                ) : null}

                {wordData.gender ? (
                  <Cell multiline disabled>
                    <InfoRow header="Род">{wordData.gender}</InfoRow>
                  </Cell>
                ) : null}
                {wordData.wcase ? (
                  <Cell multiline disabled>
                    <InfoRow header="Падеж">{wordData.wcase}.</InfoRow>
                  </Cell>
                ) : null}
                {wordData.comp ? (
                  <Cell multiline disabled>
                    <InfoRow header="Сравн. форма прилаг.">
                      {wordData.comp}
                    </InfoRow>
                  </Cell>
                ) : null}

                {wordData.soul === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Одушевленность">неодушевленное</InfoRow>
                  </Cell>
                ) : null}
                {wordData.soul === 1 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Одушевленность">одушевленное</InfoRow>
                  </Cell>
                ) : null}

                {wordData.transit ? (
                  <Cell multiline disabled>
                    <InfoRow header="Переходность глагола">
                      {wordData.transit}
                    </InfoRow>
                  </Cell>
                ) : null}

                {wordData.perfect === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак соверш. формы">нет</InfoRow>
                  </Cell>
                ) : null}
                {wordData.perfect === 1 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак соверш. формы">да</InfoRow>
                  </Cell>
                ) : null}

                {wordData.face ? (
                  <Cell multiline disabled>
                    <InfoRow header="Лицо глагола">{wordData.face}</InfoRow>
                  </Cell>
                ) : null}
                {wordData.kind ? (
                  <Cell multiline disabled>
                    <InfoRow header="Вид глагола">{wordData.kind}</InfoRow>
                  </Cell>
                ) : null}
                {wordData.time ? (
                  <Cell multiline disabled>
                    <InfoRow header="Временная форма глагола">
                      {wordData.time}
                    </InfoRow>
                  </Cell>
                ) : null}

                {wordData.inf === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак инфинитив">нет</InfoRow>
                  </Cell>
                ) : null}
                {wordData.inf === 1 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак инфинитив">да</InfoRow>
                  </Cell>
                ) : null}

                {wordData.vozv === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак возвратной формы глагола">
                      нет
                    </InfoRow>
                  </Cell>
                ) : null}
                {wordData.vozv === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак возвратной формы глагола">
                      нет
                    </InfoRow>
                  </Cell>
                ) : null}

                {wordData.nakl && (
                  <Cell multiline disabled>
                    <InfoRow header="Наклонение или залог глагола">
                      {wordData.nakl}
                    </InfoRow>
                  </Cell>
                )}

                {wordData.short === 0 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак краткой формы прилагательного">
                      нет
                    </InfoRow>
                  </Cell>
                ) : null}
                {wordData.short === 1 ? (
                  <Cell multiline disabled>
                    <InfoRow header="Признак краткой формы прилагательного">
                      да
                    </InfoRow>
                  </Cell>
                ) : null}
              </List>
            </Group>
          )}
        </>
      )}

      {copied && (
        <Snackbar
          onClose={() => this.setState({ snackbar: null })}
          before={
            <Avatar size={24} style={{ background: "var(--accent)" }}>
              <Icon16Done fill="#fff" width={14} height={14} />
            </Avatar>
          }
        >
          Слово скопировано
        </Snackbar>
      )}
    </Panel>
  );
};

Word.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

export default Word;
