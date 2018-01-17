import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';

class UserList extends React.Component {
  renderList({ item }) {
    this.url = item.data.url;
    this.name = item.data.name;
    this.date = item.data.date;
    return (
      <View style={styles.list}>
        <Image style={styles.picture} source={{ uri: this.url }} />
        <View style={styles.listItem}>
          <Text style={styles.memoName}>{this.name}</Text>
          <Text style={styles.memoDate}>{this.date}</Text>
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
    width: '60%',
    flexDirection: 'row',
  },
  memoName: {
    width: '25%',
    fontSize: 14,
    paddingLeft: 16,
  },
  memoDate: {
    fontSize: 14,
  },
  memoTitle: {
    height: '70%',
    fontSize: 16,
    paddingLeft: 16,
  },
});

export default UserList;
