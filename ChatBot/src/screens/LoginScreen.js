import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Storage from 'react-native-storage';

class LoginScreen extends React.Component {
  state = {
    name: '',
    password: '',
    idError: '',
    passwordError: '',
    users: [],
  }
  componentWillMount() {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync : {
      },
    });
    const users = [];
    const rootUserData = {
      name:'taka',
      password:'taka',
      url:'http://www.fringe81.com/product/img/docomo-ad-network/logo_service_fringe81.png',
      date:'2018/01/01',
    };
    users.push({ key: 0, data: rootUserData });
    for (let i = 0; i < 4; i += 1) {
      storage.getAllDataForKey((i + 10).toString())
        .then((user) => {
          if (typeof user[0] !== 'undefined') {
            users.push({ key: i + 1, data: user[0] });
          }
        })
        .catch(() => {
        });
    }
    this.setState({ users });
  }

  Submit() {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync : {
      },
    });
    this.setState({
      passwordError: '',
      idError: '',
    });
    let Url = '';
    let idCheck = false;
    let check = false;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ChatRoom' }),
      ],
    });
    this.state.users.forEach((user) => {
      if (this.state.name === user.data.name) {
        idCheck = true;
        if (this.state.password === user.data.password) {
          Url = user.data.url;
          check = true;
        }
      }
    });
    if (check) {
      const userInformation = {
        name: this.state.name,
        password: this.state.password,
        url: Url,
      };
      storage.save({
        key: 'LoginUser',
        id: '',
        data: userInformation,
      });
      this.props.navigation.dispatch(resetAction);
    } else if (idCheck) {
      this.setState({
        passwordError: 'パスワードが違います。',
      });
    } else {
      this.setState({
        idError: 'ユーザーIDが違います。',
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.validationErrors}>
          <Text style={styles.error}>{this.state.idError}</Text>
          <Text style={styles.error}>{this.state.passwordError}</Text>
        </View>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={(text) => { this.setState({ name: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="ユーザーID"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="パスワード"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={this.Submit.bind(this)} underlayColor="skyblue">
          <Text style={styles.buttonTitle}>ログイン</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 48,
    backgroundColor: '#fff',
  },
  validationErrors: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    paddingTop: 12,
  },
  input: {
    height: 48,
    marginTop: 42,
    borderBottomWidth: 3,
    borderColor: '#AAA',
    padding: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'skyblue',
    height: 48,
    marginTop: 84,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
