import React, { useEffect, useRef, useState, Share, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Linking, Platform, PermissionsAndroid, Alert } from 'react-native';
import Tts from 'react-native-tts';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import * as MediaLibrary from 'expo-media-library'
// import * as FileSystem from 'expo-file-system'
import sound from './src/assets/sound.png';


// interface WebShareAPIParam {
//   // ref https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
//   url?: string;
//   text?: string;
//   title?: string;
//   // files unhandled
// }

const MainScreen = () => {
  const { height, width } = useWindowDimensions();
  const [voices, setVoices] = useState([]);
  const [url, setUrl] = useState();
  const [ttsStatus, setTtsStatus] = useState('initiliazing')
  const [speechRate, setSpeechRate] = useState(0.5);
  const [data, setData] = useState();
  const webViewRef = useRef();

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      setUrl(url ? url : 'https://kamus-nostalgia.vercel.app/?mobile');
    });

    Linking.addEventListener('url', _handleOpenURL);

  }, [])

  // useEffect(() => {
  //   if (data.type === "download") {
  //     // if (data.type === 'download') {
  //     // SaveToPhone(data.url)
  //     // }/
  //   }
  // }, [data])

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const saveImg = async (base64Img) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    const dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;
    const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.png`;
    const imageDatas = base64Img.split('data:image/png;base64,');
    const imageData = imageDatas[1];

    RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then((rst) => {
      CameraRoll.save(downloadDest).then((e1) => {
        Alert.alert('Berhasil Menyimpan Gambar')
      }).catch((e2) => {
        Alert.alert('Gagal Menyimpan')
      })

    });

  }

  const _handleOpenURL = data => {
    setUrl(data.url ? data.url : 'https://kamus-nostalgia.vercel.app/');
  };


  // const SaveToPhone = async (url) => {
  //   console.log(url)

  //   const { uri } = await FileSystem.downloadAsync(
  //     url,
  //     `${FileSystem.documentDirectory}meme.jpg`
  //   ).catch((e) =>
  //     console.log('instagram share failed', JSON.stringify(e), url)
  //   )

  //   const permission = await MediaLibrary.requestPermissionsAsync()
  //   if (permission.granted) {
  //     try {
  //       const asset = await MediaLibrary.createAssetAsync(uri)
  //       MediaLibrary.createAlbumAsync('Images', asset, false)
  //         .then(() => {
  //           console.log('File Saved Successfully!')
  //           // Toast.show('image save success!!', {
  //           //   duration: 1000,
  //           // });
  //         })
  //         .catch(() => {
  //           console.log('Error In Saving File!')
  //         })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     console.log('Need Storage permission to save file')
  //   }
  // }

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


  // const onMessage = useCallback(async (e: WebViewMessageEvent) => {
  //   const { data } = e.nativeEvent;
  //   console.log(e.nativeEvent, );
  //   if (data.startsWith('share:')) {
  //     try {
  //       const param: WebShareAPIParam = JSON.parse(data.slice('share:'.length));
  //       if (param.url == null && param.text == null) {
  //         return;
  //       }
  //       await Share.share(
  //         {
  //           title: param.title,
  //           message: [param.text, param.url].filter(Boolean).join(' '), // join text and url if both exists
  //           url: param.url,
  //         },
  //         {
  //           dialogTitle: param.title,
  //           subject: param.title,
  //         },
  //       );
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // }, []);


  useEffect(() => {
    // let add = "?mobile";
    // setUrl(url + add);

  }, [])

  const onMessage = (e) => {
    // let tmp = e?.nativeEvent?.url + '?mobile'
    setUrl(e?.nativeEvent?.url);
    if (e?.nativeEvent.url === "https://kamus-nostalgia.vercel.app/write") {
      setData(e?.nativeEvent?.data);
    }
    if (e?.nativeEvent.url === "https://kamus-nostalgia.vercel.app/template") {
      saveImg(e?.nativeEvent?.data)
    }
  }

  // const handleNav = (e) => {
  //   setUrl(e.url);
  //   console.log(e.url);
  //   // if (e.url !== 'https://kamus-nostalgia.vercel.app') {
  //   //   webViewRef.current.stopLoading();
  //   //   Linking.openURL(e.url);
  //   // }
  // }
  return (
    <>
      {url ? (
        <>

          <WebView
            ref={webViewRef}
            onMessage={onMessage}
            javaScriptEnabled={true}
            scalesPageToFit={false}
            domStorageEnabled={true}
            source={{ uri: url }}
          />
          {url === "https://kamus-nostalgia.vercel.app/write" && data != "undefined" &&
            <TouchableOpacity style={styles.button} onPress={readText}>
              <View style={styles.wrapper}>
                <Image style={styles.img} source={sound} />
              </View>
            </TouchableOpacity>
          }
        </>
      )
        : null
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
    bottom: '1.6%',
    left: '20%',
    alignItems: "center",
    backgroundColor: "#be2239",
    padding: 12,
    // width: 90,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: 'bold'
  }
});

export default MainScreen;
