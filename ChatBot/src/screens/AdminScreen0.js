import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import BottomBar from '../components/Interface';


const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {
  },
});
const url = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
class AdminScreen extends React.Component {
  state = {
    name: '',
    password: '',
    url: '',
    CurrentUser: '',
    nameError:'',
    passwordError:'',
    urlError:'',
    users: [
      { key:0, data:'' },
      { key:1, data:'' },
      { key:2, data:'' },
      { key:3, data:'' },
    ],
  }

  componentWillMount() {
    storage.getAllDataForKey('CurrentUser')
      .then((user) => {
        this.setState({ CurrentUser: user });
        console.log(this.state.CurrentUser);
      });
    const initialUsers = [];
    for (let i = 0; i < 4; i += 1) {
      storage.getAllDataForKey((i + 0).toString())
        .then((thisData) => {
          initialUsers.push({ key: i + 0, data: thisData[0] });
        });
    }
    this.setState({ users: initialUsers });
  }
  Registar() {
    const userInformation = {
      name: this.state.name,
      password: this.state.password,
      url: this.state.url,
    };
    console.log(userInformation.name.length);
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
        key: 0,
        data: userInformation,
      });
      for (let i = 0; i < 3; i += 1) {
        users.push({
          key: i + 1,
          data:{
            name: this.state.users[i].data.name,
            password: this.state.users[i].data.password,
            url,
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
      this.setState({
        name: '',
        password: '',
        url: '',
      });
    }
  }
  Delete(thisUser) {
    // for (let i = 0; i < 10; i += 1) {
    // for (let name in users) {
    //   get
    //   if (thisUser !== this.state.CurrentUser.name) {
    //     continue
    //   }
    // }
    console.log(this.state.nameList);
    console.log(thisUser);
    storage.clearMapForKey(thisUser);
    console.log(this.state.userData);
    this.props.navigation.navigate('Admin');
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

            <View style={styles.User}>
              <View style={styles.picture}>
                <Image
                  source={{ uri: this.state.urlList }}
                  style={{ width: 50, height: 50, backgroundColor: 'aqua' }}
                  // source={require('./water.png')}
                />
                <Text style={styles.pictureText}>pic</Text>
              </View>
              <View style={styles.name}>
                <Text style={styles.nameText}>taro</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateText}>2018/01/01</Text>
              </View>
              <View style={styles.delete}>
                <TouchableHighlight style={styles.deleteButton} data={this.state.name} onPress={this.Delete.bind(this)} underlayColor="skyblue">
                  <Text style={styles.deleteButtonTitle}>削除</Text>
                </TouchableHighlight>
              </View>
            </View>
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
  User: {
    height: 72,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picture: {
    height: '80%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    height: '100%',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    height: '50%',
    width: '80%',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 8,
  },
});

export default AdminScreen;
