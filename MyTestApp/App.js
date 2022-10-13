import React  from 'react';
import { KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native';
import MainScreen from './MainScreen';

export default App = () => {
  return (

    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        enabled={false}
      >
        <StatusBar
          animated={true}
          backgroundColor="#d5334b"
        />
        <MainScreen />
      </KeyboardAvoidingView>
    </>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  }
});