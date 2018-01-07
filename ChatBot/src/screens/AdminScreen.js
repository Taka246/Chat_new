import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';

class AdminScreen extends React.Component {
  state = {
    email: '',
    password: '',
    url: '',
  }

  render() {
    return (
      <View style={styles.container}>
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
        <TouchableHighlight style={styles.button} underlayColor="lightblue">
          <Text style={styles.buttonTitle}>登録</Text>
        </TouchableHighlight>
        <View style={styles.users}>
          <Text style={styles.usersTitle}>ユーザ一覧</Text>

          <View style={styles.User}>
            <View style={styles.picture}>
              <Text style={styles.picture}>picture</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.name}>userName</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.date}>date</Text>
            </View>
            <TouchableHighlight style={styles.deleteButton} underlayColor="lightblue">
              <Text style={styles.deleteButtonTitle}>削除</Text>
            </TouchableHighlight>
          </View>

        </View>
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
  input: {
    height: 48,
    marginTop: 24,
    borderBottomWidth: 3,
    borderColor: '#AAA',
    padding: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'lightblue',
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
    marginTop: 24,
    width: '100%',
  },
  usersTitle: {
    fontSize: 18,
  },
  User: {
    height: 72,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picture: {
    height: '100%',
    width: '25%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    height: '100%',
    width: '25%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    height: '100%',
    width: '25%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    height: '50%',
    width: '25%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default AdminScreen;
