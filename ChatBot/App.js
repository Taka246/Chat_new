import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import InterfaceScreen from './src/screens/InterfaceScreen';
import AdminScreen from './src/screens/AdminScreen';

const App = StackNavigator({
  Login:      { screen: LoginScreen },
  Interface:      { screen: InterfaceScreen },
  Admin:      { screen: AdminScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
});

export default App;
