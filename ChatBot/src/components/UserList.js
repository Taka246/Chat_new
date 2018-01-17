import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableHighlight } from 'react-native';

class UserList extends React.Component {
  Delete(thisUser) {
    this.data = thisUser;
  }

  renderList({ item }) {
    this.url = item.data.url;
    this.name = item.data.name;
    this.date = item.data.date;
    return (
      <View style={styles.User}>
        <View style={styles.picture}>
          <Image
            source={{ uri: this.url }}
            style={{ width: 50, height: 50, backgroundColor: 'aqua' }}
          />
        </View>
        <View style={styles.name}>
          <Text>{this.name}</Text>
        </View>
        <View style={styles.date}>
          <Text>{this.date}</Text>
        </View>
        <View style={styles.delete}>
          <TouchableHighlight style={styles.deleteButton} onPress={this.Delete.bind(this)} underlayColor="skyblue">
            <Text style={styles.deleteButtonTitle}>削除</Text>
          </TouchableHighlight>
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
    width: '30%',
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
  },
});

export default UserList;
