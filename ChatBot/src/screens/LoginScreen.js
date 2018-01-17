import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Storage from 'react-native-storage';

class LoginScreen extends React.Component {
  state = {
    name: '',
    password: '',
    error:'',
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
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ChatRoom' }),
      ],
    });
    storage.getAllDataForKey(this.state.name)
      .then((users) => {
        console.log(users);
        if (users[0].name !== '' && users[0].password === this.state.password) {
          const userInfomation = {
            name: this.state.name,
            password: this.state.password,
            url: users[0].url,
          };
          storage.save({
            key: 'currentUser',
            id: this.state.password,
            data: userInfomation,
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({
            error: 'ユーザーIDもしくはパスワードが違います。',
          });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.error}</Text>
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
  error: {
    color: 'red',
  },
  input: {
    height: 48,
    marginTop: 72,
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
