/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
  Button,
  FlatList,
} from 'react-native';

//import { HttpRequest } from '../functions/axios/http';
//import { url_users } from '../functions/axios/urls';
//import Projects from '../components/Projects';

import Projects from '../components/Projects';

export const App = () => {
  //const [data, setData] = useState([]);
  //const [isLoading, setLoading] = useState(true);
  //const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  //const scrollViewRef = useRef<null | ScrollView>(null);
  /*
  const Projects = async () => {
    const bla = await HttpRequest(url_users, 'get');
    console.log(bla);
  };

  const renderItem = (itemData) => {
    return <View></View>;
  };*/

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>blakkblaI</Text>
        <Projects />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
});

export default App;
