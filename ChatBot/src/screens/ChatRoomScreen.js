import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import BottomBar from '../components/Interface';

class ChatRoomScreen extends React.Component {
  state = {
    userName: ['Taro'],
    userNames: ['Name'],
    memoList: ['メモ内容'],
    date: Date().split('G')[0],
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.edit}>
          <View style={styles.editUser}>
            <Text style={styles.editPicture}>pic</Text>
            <Text style={styles.editName}>{this.state.userName}</Text>
          </View>
          <View style={styles.editItem}>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={(text) => { this.setState({ email: text }); }}
              placeholder="メッセージ"
            />
            <View style={styles.editBotton}>
              <Text style={styles.editBottonText}>投稿</Text>
            </View>
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.picture}>pic</Text>
          <View style={styles.listItem}>
            <View style={styles.listTheme}>
              <Text style={styles.memoName}>{this.state.userNames}</Text>
              <Text style={styles.memoDate}>{this.state.date}</Text>
            </View>
            <View>
              <Text style={styles.memoTitle}>{this.state.memoList}</Text>
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
    backgroundColor: '#FFFDF6',
  },
  edit: {
    height: '25%',
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFDF6',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editUser: {
    height: '85%',
    width: '25%',
    alignItems: 'center',
  },
  editPicture: {
    height: '70%',
    width: '100%',
    backgroundColor: 'skyblue',
  },
  editName: {
    fontSize: 14,
  },
  editItem: {
    height: '100%',
    width: '75%',
    alignItems: 'flex-end',
  },
  input: {
    height: '70%',
    width: '95%',
    borderWidth: 3,
    borderColor: '#000',
    marginTop: 10,
    fontSize: 18,
  },
  editBotton: {
    width: '30%',
    height: '20%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 10,
    justifyContent: 'center',
  },
  list: {
    height: '20%',
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    height: '74.375%',
    width: '25%',
    backgroundColor: 'skyblue',
  },
  listItem: {
    height: '100%',
    width: '75%',
  },
  listTheme: {
    height: '30%',
    flexDirection: 'row',
  },
  memoName: {
    width: '25%',
    fontSize: 14,
    paddingLeft: 12,
  },
  memoDate: {
    fontSize: 14,
  },
  memoTitle: {
    height: '70%',
    fontSize: 18,
    paddingLeft: 12,
  },
});

export default ChatRoomScreen;
