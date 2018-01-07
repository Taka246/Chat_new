import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import InterfaceScreen from './src/screens/InterfaceScreen';

const App = StackNavigator({
  Login:      { screen: LoginScreen },
  Interface:      { screen: InterfaceScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
});

export default App;
