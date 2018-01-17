import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

import UserList from '../components/UserList';
import BottomBar from '../components/Interface';


const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {
  },
});
class AdminScreen extends React.Component {
  state = {
    name: '',
    password: '',
    url: '',
    nameError:'',
    passwordError:'',
    urlError:'',
    users: [
      { key:0, data:'' },
      { key:1, data:'' },
      { key:2, data:'' },
      { key:3, data:'' },
    ],
    date() {
      const nowDate = new Date().toLocaleString().split(' ');
      return (nowDate[0]);
    },
  }

  componentWillMount() {
    const initialUsers = [];
    for (let i = 0; i < 4; i += 1) {
      storage.getAllDataForKey((i + 10).toString())
        .then((thisData) => {
          initialUsers.push({ key: i + 0, data: thisData[0] });
        });
    }
    this.setState({ users: initialUsers });
  }
  Registar() {
    this.setState({
      nameError: '',
      passwordError: '',
      urlError: '',
    });
    const userInformation = {
      name: this.state.name,
      password: this.state.password,
      url: this.state.url,
      date: this.state.date(),
    };

    let check = true;
    if (userInformation.name.length < 2 || userInformation.name.length > 20) {
      this.setState({
        nameError: 'ユーザ名が指定文字数範囲外です。',
      });
      check = false;
    }
    if (userInformation.password.length < 4 || userInformation.password.length > 20) {
      this.setState({
        passwordError: 'パスワードが指定文字数範囲外です。',
      });
      check = false;
    }
    if (userInformation.url.length < 8 || userInformation.url.length > 250) {
      this.setState({
        urlError: '表示画像URLが指定文字数範囲外です。',
      });
      check = false;
    }
    if (check) {
      const users = [];
      users.push({
        key: 10,
        data: userInformation,
      });
      for (let i = 0; i < 3; i += 1) {
        users.push({
          key: i + 11,
          data:{
            name: this.state.users[i].data.name,
            password: this.state.users[i].data.password,
            url: this.state.users[i].data.url,
            date: this.state.users[i].data.date,
          },
        });
      }
      users.forEach((user) => {
        storage.save({
          key: user.key.toString(),
          id: '',
          data: user.data,
        });
      });
      this.setState({ users });
    }
    this.setState({
      name: '',
      password: '',
      url: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.validationErrors}>
          <Text style={styles.error}>{this.state.nameError}</Text>
          <Text style={styles.error}>{this.state.passwordError}</Text>
          <Text style={styles.error}>{this.state.urlError}</Text>
        </View>
        <View style={styles.contents}>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => { this.setState({ name: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="ユーザ名 ( 2 ~ 20文字 )"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="パスワード ( 4 ~ 20文字 )"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={this.state.url}
            onChangeText={(text) => { this.setState({ url: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="表示画像URL ( 8 ~ 250文字 )"
          />
          <TouchableHighlight style={styles.button} onPress={this.Registar.bind(this)} underlayColor="skyblue">
            <Text style={styles.buttonTitle}>登録</Text>
          </TouchableHighlight>
          <View style={styles.users}>
            <Text style={styles.usersTitle}>ユーザ一覧</Text>
            <UserList List={this.state.users} navigation={this.props.navigation} />
          </View>
        </View>
        <BottomBar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  validationErrors: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },
  error: {
    color: 'red',
    fontSize: 14,
    paddingTop: 6,
  },
  contents: {
    padding: 48,
    paddingTop: 0,
  },
  input: {
    height: 48,
    marginTop: 24,
    borderBottomWidth: 3,
    borderColor: '#AAA',
    padding: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'skyblue',
    height: 48,
    marginTop: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  users: {
    height: 216,
    marginTop: 36,
    width: '100%',
  },
  usersTitle: {
    fontSize: 18,
  },
});

export default AdminScreen;
