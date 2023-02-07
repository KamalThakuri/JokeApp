import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {
  const [joke, setJoke] = useState([
    {
      error: false,
      category: 'Pun',
      type: 'twopart',
      setup: "What do you call a caveman's fart?",
      delivery: 'A blast from the past.',
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      safe: true,
      id: 317,
      lang: 'en',
    },
  ]);

  const [render, setRender] = useState([]);

  const onPressHandler = async joke => {
    console.log('presed');

    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/Any?type=twopart`,
      );
      const json = await response.json();
      setJoke(json);

      setRender(current => [{...joke}, ...current]);

      console.log(joke);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // onPressHandler();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#333'}}>
      <View style={styles.header}>
        <Text style={{fontSize: 32}}>Random Jokes 😂 !</Text>
        <Text style={{fontSize: 18}}>Lets Laugh together 😂 !</Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => onPressHandler(joke)}
          style={{marginVertical: 15, alignItems: 'center'}}>
          <View style={styles.button}>
            <Text style={{color: '#ccc'}}>New Joke</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.jokeField}>
        {render && (
          <FlatList
            data={render}
            renderItem={({item}) => (
              <View style={styles.jokeBox}>
                <Text>Q. {item.setup}</Text>
                <Text>A. {item.delivery}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  button: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ccc',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },

  jokeField: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 20,
    borderRadius: 16,
  },

  jokeBox: {
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
});
