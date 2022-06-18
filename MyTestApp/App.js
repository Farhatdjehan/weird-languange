/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [text, setText] = useState();
  const [languange, setLanguange] = useState();

  const [alert, setAlert] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const toggleChangeLanguange = languange => {
    setLanguange(languange);
  };
  const onChangeText = e => {
    setText(e);
  };

  const convertWord = () => {
    if (languange !== undefined) {
      let tmp = text;
      let convertNonVocalAlpha = tmp.split(/[aeiou]/gi);
      let convertVocalAlpha = tmp.match(/[aeiou]/gi);

      let resultConvert;

      for (let i = 0; i <= convertNonVocalAlpha.length; i++) {
        for (let j = 0; j <= 0; j++) {
          resultConvert +=
            convertNonVocalAlpha[i] +
            convertVocalAlpha[i] +
            languange +
            convertVocalAlpha[i];
        }
      }
      console.log(resultConvert.split('undefined'));
    } else {
      setAlert(true);
    }
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleChangeLanguange('g')}>
            <Text style={styles.buttonText}>Bahasa G</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleChangeLanguange('p')}>
            <Text style={styles.buttonText}>Bahasa P</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleChangeLanguange('s')}>
            <Text style={styles.buttonText}>Bahasa S</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <Button title="Submit Kata" onPress={convertWord}></Button>
          <Modal
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setAlert(!alert);
            }}
            animationType="fade"
            transparent={true}
            visible={alert}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Belum Milih</Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
