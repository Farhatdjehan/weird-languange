import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import MainScreen from './MainScreen';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">HOME</Text>
  </Layout>
);
export default () => (
  <>
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <HomeScreen /> */}
      <MainScreen />
    </ApplicationProvider>
  </>
);
