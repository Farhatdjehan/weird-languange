import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  Layout,
  IndexPath,
  Button,
  Input,
  Text,
  Select,
  SelectItem,
} from '@ui-kitten/components';

const MainScreen: () => Node = () => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const data = ['Bahasa G', 'Bahasa S', 'Bahasa P'];
  const displayValue = data[selectedIndex.row];
  const renderOption = (title, idx) => <SelectItem key={idx} title={title} />;
  const [text, setText] = useState();

  const onChangeText = e => {
    let tmp = e;
    if (tmp !== '') {
      let convertNonVocalAlpha = tmp.split(/[aeiou]/gi);
      let convertVocalAlpha = tmp.match(/[aeiou]/gi);
      let languange = displayValue.split(' ')[1].toLowerCase();
      let resultConvert;

      if (convertVocalAlpha === undefined || convertVocalAlpha === null) {
        resultConvert += tmp;
      } else {
        for (let i = 0; i <= convertNonVocalAlpha.length; i++) {
          for (let j = 0; j <= 0; j++) {
            resultConvert +=
              convertNonVocalAlpha[i] +
              convertVocalAlpha[i] +
              languange +
              convertVocalAlpha[i];
          }
        }
      }

      setText(resultConvert.split('undefined'));
    } else {
      setText();
    }
  };

  useEffect(() => {}, [text]);

  return (
    <>
      <Layout style={styles.inputContainer} level="1">
        <Text style={{ marginBottom: 32, textAlign: 'center' }}>Kamnos</Text>
        <Input
          style={{ marginBottom: 24, borderRadius: 24 }}
          multiline
          placeholder="Masukkan Kata..."
          onChangeText={onChangeText}
          value={text}
          size="large"
        />

        <Text style={{ marginBottom: 8, fontWeight: 'bold', color: '#fff' }}>Tipe Bahasa</Text>
        <Select
          style={{ marginBottom: 50, borderRadius: 8 }}
          placeholder="Pilih Bahasa"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
      </Layout>
      <Layout style={styles.resultContainer}>
        <View style={{backgroundColor: '#E2E2E2', padding: 16, borderRadius: 24}}>
          <Text style={{ marginBottom: 12, fontWeight: 'bold' }}>Hasil :</Text>
          <Text>{text && text[1]}</Text>
        </View>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    backgroundColor: '#D5334B',
    // flexDirection: 'column',
  },
  resultContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    flex: 1,
    position: 'relative',
    top: -30,
    borderRadius: 28
    // flexDirection: 'column',
  },
  input: {
    borderRadius: 2,
    marginVertical: 2,
  },
});

export default MainScreen;
