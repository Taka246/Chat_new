import React from 'react';
import { StyleSheet, View, Text, TextInput, AsyncStorage, TouchableHighlight, Image } from 'react-native';
import Storage from 'react-native-storage';

import ChatList from '../components/ChatList';
import BottomBar from '../components/Interface';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {
  },
});
class ChatRoomScreen extends React.Component {
  state = {
    date() {
      const nowDate = new Date().toLocaleString().split(' ');
      return (
        `${nowDate[0]}    ${nowDate[1]}`
      );
    },
    memo: '',
    memos: [
      { key:0, data:'' },
      { key:1, data:'' },
      { key:2, data:'' },
      { key:3, data:'' },
    ],
    LoginUser: '',
    Url: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    memoError: '',
  }
  componentWillMount() {
    storage.getAllDataForKey('LoginUser')
      .then((user) => {
        console.log(user);
        this.setState({ LoginUser: user[0].name, Url: user[0].url });
      });
    const initialMemos = [];
    for (let i = 0; i < 4; i += 1) {
      storage.getAllDataForKey((i + 5).toString())
        .then((thisData) => {
          initialMemos.push({ key: i + 0, data: thisData[0] });
        });
    }
    this.setState({ memos: initialMemos });
  }
  Submit() {
    const memos = [];
    if (this.state.memo.length < 1 || this.state.memo.length > 300) {
      this.setState({
        memoError: '文字数が指定範囲外です。',
      });
    } else {
      memos.push({
        key: 0,
        data:{
          memo:this.state.memo,
          name:this.state.LoginUser,
          date:this.state.date(),
          url:this.state.Url,
        },
      });
      for (let i = 0; i < 3; i += 1) {
        memos.push({
          key: i + 1,
          data:{
            memo:this.state.memos[i].data.memo,
            name:this.state.memos[i].data.name,
            date:this.state.memos[i].data.date,
            url:this.state.memos[i].data.url,
          },
        });
      }
      this.setState({ memos });
      memos.forEach((memo) => {
        storage.save({
          key: (memo.key + 5).toString(),
          id: '',
          data: memo.data,
        });
      });
    }
    this.setState({ memo: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.edit}>
          <View style={styles.editUser}>
            <Image style={styles.editPicture} source={{ uri: this.state.Url }} />
            <Text style={styles.editName}>{this.state.LoginUser}</Text>
          </View>
          <View style={styles.editItem}>
            <TextInput
              style={styles.input}
              value={this.state.memo}
              onChangeText={(text) => { this.setState({ memo: text }); }}
              placeholder="メッセージ ( 1 ~ 300文字 )"
              multiline
              blurOnSubmit={false}
            />
            <View style={styles.editBottom}>
              <View style={styles.validationError}>
                <Text style={styles.error}>{this.state.memoError}</Text>
              </View>
              <TouchableHighlight
                style={styles.editButton}
                onPress={this.Submit.bind(this)}
                underlayColor="skyblue"
              >
                <Text style={styles.editButtonText}>投稿</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.lists}>
          <ChatList List={this.state.memos} navigation={this.props.navigation} />
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
  editBottom: {
    height: '20%',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  validationError: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  editButton: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
  },
  lists: {
    height: '65%',
  },
});

export default ChatRoomScreen;
