import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';

import BottomBar from '../components/Interface';


class AdminScreen extends React.Component {
  state = {
    email: '',
    password: '',
    url: '',
  }


  Registar() {
    const userInfomation = [this.state.email, this.state.password, this.state.url];
    AsyncStorage.setItem('userInfomation', JSON.stringify(userInfomation))
      .then(() => {
        console.log(userInfomation);
        this.props.navigation.navigate('Admin');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }); }}
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
                <Text style={styles.pictureText}>pic</Text>
              </View>
              <View style={styles.name}>
                <Text style={styles.nameText}>Taro</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateText}>2018/01/01</Text>
              </View>
              <View style={styles.delete}>
                <TouchableHighlight style={styles.deleteButton} underlayColor="skyblue">
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
  contents: {
    padding: 48,
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
    backgroundColor: 'skyblue',
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
