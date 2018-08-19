import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { MapView, Geocode } from 'react-native-baidumap-sdk';

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#292c36',
  },
  form: {
    padding: 15,
  },
  mapView: {
    flex: 1,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
});

export default class MapSearchScreen extends Component {
  state = {}

  address = '海龙大厦'
  city = ''
  init = true

  search = () => {
    Geocode.search(this.address, this.city)
      .then(result => {
          this.mapView.setStatus({ center: result }, 1000);
          this.setState({coordinate: result});
          this.marker.select();
      })
        .catch(() => Alert.alert('Not found'));
  }

    componentDidMount() {
        if(this.init) {
            const {navigation} = this.props;
            this.setState(navigation.getParam('data'));
            this.init = false;
        }
    }

    render() {
    return (
      <View style={style.body}>
        <MapView ref={ref => this.mapView = ref} style={style.mapView}>
            {this.state.coordinate && this.state.coordinate.address &&
            <MapView.Marker
              ref={ref => this.marker = ref}
              title={this.state.coordinate.address}
              coordinate={this.state.coordinate}
              onCalloutPress={() => Alert.alert(
                '确认地址',
                ''+this.state.coordinate.address,
                [
                    {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '确定', onPress: () => this.props.navigation.navigate('Post', {data: this.state})},
                ]
                )}
            />
          }
        </MapView>
        <View style={style.form}>
          <TextInput
            defaultValue={this.address}
            style={style.input}
            returnKeyType="search"
            placeholder="地址"
            placeholderTextColor="#9e9e9e"
            onChangeText={text => this.address = text}
            onSubmitEditing={this.search}
          />
          <TextInput
            style={style.input}
            returnKeyType="search"
            placeholder="城市"
            placeholderTextColor="#9e9e9e"
            onChangeText={text => this.city = text}
            onSubmitEditing={this.search}
          />
          <Button title="Search" onPress={this.search} />
        </View>
      </View>
    );
  }
}
