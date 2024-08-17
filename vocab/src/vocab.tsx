import React from "react";
import fetch from "node-fetch";
import { List } from "@raycast/api";

export default async function Vocab(props) {

  let word = props.arguments.word;

  console.log(word);

  // Make an api call to dictionary to fetch definitions

  let response = await get_definitions(word) 

  console.log(response);

  // Make a list of all definitions

  return (
    <List>
      <List.Item title="Item 1" />
      <List.Item title="Item 2" subtitle="Optional subtitle" />
    </List>

  )


}


async function get_definitions(word: string) {

  let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  let data = await response.json();

  let definitions = data[0].meanings.map((meaning) => {
    return {
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map((definition) => {
        return definition.definition;
      }),
    };
  }
  );

  return definitions;
}
