import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Linking } from 'react-native';
import Tts from 'react-native-tts';
import sound from './src/assets/sound.png';


const MainScreen = () => {
  const { height, width } = useWindowDimensions();
  console.log(height, width);
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initiliazing')
  const [speechRate, setSpeechRate] = useState(0.5);
  const [data, setData] = useState();
  const webViewRef = useRef();
  const [speechPitch, setSpeechPitch] = useState(1);
  const [
    text,
    setText
  ] = useState('Enter Text like Hello About React');

  // useEffect(() => {
  //   Tts.addEventListener(
  //     'tts-start',
  //     (_event) => setTtsStatus('started')
  //   );
  //   Tts.addEventListener(
  //     'tts-finish',
  //     (_event) => setTtsStatus('finished')
  //   );
  //   Tts.addEventListener(
  //     'tts-cancel',
  //     (_event) => setTtsStatus('cancelled')
  //   );
  //   Tts.setDefaultRate(speechRate);
  //   Tts.setDefaultPitch(speechPitch);
  //   return () => {
  //     Tts.removeEventListener(
  //       'tts-start',
  //       (_event) => setTtsStatus('started')
  //     );
  //     Tts.removeEventListener(
  //       'tts-finish',
  //       (_event) => setTtsStatus('finished'),
  //     );
  //     Tts.removeEventListener(
  //       'tts-cancel',
  //       (_event) => setTtsStatus('cancelled'),
  //     );
  //   };
  // }, []);

  const readText = async () => {
    Tts.setDefaultLanguage('id-ID');
    Tts.stop();
    if (data == undefined) {
      Tts.speak('');
    } else {
      Tts.speak(data);
    }
  };

  const onMessage = (e) => {
    setData(e?.nativeEvent?.data);
  }

  const handleNav = (e) => {
    if (e.url.includes('play.google')
      || e.url.includes('whatsapp')
      || e.url.includes('facebook')
      || e.url.includes('twitter')
      || e.url.includes("asana")) {
      webViewRef.current.stopLoading();
      Linking.openURL(e.url);
    }
  }
  return (
    <>
      <WebView
        ref={webViewRef}
        onNavigationStateChange={(e) => handleNav(e)}
        onMessage={onMessage}
        source={{ uri: 'https://kamus-nostalgia.vercel.app?mobile' }}
      />
      {data != "undefined" &&
        <TouchableOpacity style={styles.button} onPress={readText}>
          <View style={styles.wrapper}>
            <Image style={styles.img} source={sound} />
            <Text style={styles.text}>Suara</Text>
          </View>
        </TouchableOpacity>
      }
    </>
  );
};

const styles = StyleSheet.create({

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  img: {
    width: 15,
    height: 15,
    marginRight: 6
  },

  button: {
    position: "absolute",
    bottom: '2%',
    left: '4%',
    alignItems: "center",
    backgroundColor: "#be2239",
    padding: 12.25,
    width: 90,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: 'bold'
  }
});

export default MainScreen;
