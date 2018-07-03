import React from 'react';
import { Button, TouchableOpacity, View, Text, FlatList, Alert } from 'react-native';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const buttonClick = () => {
    Alert.alert('别按我！我一按就炸！');
}

class MultiSelectList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    Alert.alert(`You clicked ${id}`);
    /*
      // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
    */
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.title}
    />
  );

  render() {
    return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Button style={{flex: 1, justifyContent: 'center'}} title='农田招人' onPress={buttonClick} />
            <Button style={{flex: 1, justifyContent: 'center'}} title='专业农友' onPress={buttonClick} />
          </View>
          <FlatList
            data={this.props.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
    );
  }
}

module.exports = MultiSelectList;
