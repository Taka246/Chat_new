import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import AdminScreen from './src/screens/AdminScreen';
import ChatRoomScreen from './src/screens/ChatRoomScreen';

const App = StackNavigator({
  Login:      { screen: LoginScreen },
  ChatRoom:      { screen: ChatRoomScreen },
  Admin:      { screen: AdminScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
});

export default App;
