import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import Storage from 'react-native-storage';

class ChatList extends React.Component {
  state = {
    user: '',
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
    storage.getAllDataForKey('LoginUser')
      .then((userData) => {
        this.setState({ user: userData[0].name });
      });
  }

  Delete(thisUser) {
    this.data = thisUser;
  }

  deleteButton() {
    return (
      <TouchableHighlight style={styles.deleteButton} onPress={this.Delete.bind(this)} underlayColor="skyblue">
        <Text style={styles.deleteButtonTitle}>削除</Text>
      </TouchableHighlight>
    );
  }

  renderList({ item }) {
    this.url = item.data.url;
    this.name = item.data.name;
    this.date = item.data.date;
    this.memo = item.data.memo;
    return (
      <View style={styles.list}>
        <Image style={styles.picture} source={{ uri: this.url }} />
        <View style={styles.listItem}>
          <View style={styles.listTheme}>
            <Text style={styles.memoName}>{this.name}</Text>
            <Text style={styles.memoDate}>{this.date}</Text>
          </View>
          <View>
            <Text style={styles.memoTitle}>{this.memo}</Text>
            <View style={styles.delete}>
              {this.state.user === this.name ? this.deleteButton() : null }
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (

      <View style={styles.chatList}>
        <FlatList data={this.props.List} renderItem={this.renderList.bind(this)} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  chatList: {
    width: '100%',
    flex: 1,
  },
  list: {
    height: 150,
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
    width: '35%',
    fontSize: 16,
    paddingLeft: 16,
  },
  memoDate: {
    fontSize: 16,
  },
  memoTitle: {
    height: '60%',
    fontSize: 16,
    paddingLeft: 16,
  },
  delete: {
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  deleteButton: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
  },
  deleteButtonTitle: {
    fontSize: 14,
  },
});

export default ChatList;
