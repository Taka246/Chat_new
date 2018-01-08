import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

class InterfaceScreen extends React.Component {
  ChatRoom() {
    this.props.navigation.navigate('ChatRoom');
  }

  UserAdmin() {
    this.props.navigation.navigate('Admin');
  }

  Logout() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonBar}>
          <TouchableHighlight style={styles.button} onPress={this.ChatRoom.bind(this)} underlayColor="skyblue">
            <Text style={styles.buttonTitle}>チャットルーム</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.UserAdmin.bind(this)} underlayColor="skyblue">
            <Text style={styles.buttonTitle}>ユーザー管理</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.Logout.bind(this)} underlayColor="skyblue">
            <Text style={styles.buttonTitle}>ログアウト</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  buttonBar: {
    backgroundColor: 'skyblue',
    paddingBottom: 24,
    height: 72,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#000',
  },
  button: {
    height: 10,
    width: '33.3%',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 14,
  },
});

export default InterfaceScreen;
