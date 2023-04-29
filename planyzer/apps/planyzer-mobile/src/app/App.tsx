/* eslint-disable jsx-a11y/accessible-emoji */
import { SafeAreaView, StatusBar } from 'react-native';
import Projects from '../components/Projects';
export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Projects />
      </SafeAreaView>
    </>
  );
};

export default App;
