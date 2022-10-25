import {AuthProvider} from './src/Auth/AuthProvider';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Screens from './src/Screens';

const App = () => {
  return (
    <AuthProvider>
      <Screens></Screens>
    </AuthProvider>
  );
};

export default App;
