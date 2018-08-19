import React, { Component } from 'react';
import {
    Image, StyleSheet, TouchableOpacity, View, Alert,
    ActivityIndicator
} from 'react-native';
import { MapView, Location } from 'react-native-baidumap-sdk';
import icon from '../assets/ic_my_location.png';

const style = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 40,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 12,
    tintColor: '#616161',
  },
});

export default class MapViewExample extends Component {
    state = {
        externalData: null,
    };

    location = () => this.mapView.setStatus({ center: this.state.location }, 1000)

    onStatusChange = status => {
        this.status = status;
        this.cluster.update(status);
    }

    onPress = cluster => {
        this.mapView.setStatus({
            center: cluster.coordinate,
            zoomLevel: this.status.zoomLevel + 1,
        }, 500);
    }

    renderMarker = item => (
        <MapView.Marker
            key={item.id}
            title={item.coordinate.address}
            coordinate={item.coordinate}
        />
    )

    async asyncLoadData() {
        this.markers = await db.field.filter(v => v.coordinate!==undefined);
        console.log(JSON.stringify(this.markers));
        return true;
    }

    async componentDidMount() {
        await Location.init();
        Location.setOptions({ gps: true });
        this.listener = Location.addLocationListener(location => {
            this.setState({ location });
        });
        Location.start();

        this._asyncRequest = this.asyncLoadData().then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );

        const center = this.props.navigation.getParam('center', false);
        if(center) {
            this.setState({location: center});
            this.location();
            //FIXME:
            //Possible Unhandled Promise Rejection
            //TypeError: undefined is not an object (evaluating '_this.mapView.setStatus')
        }
    }

    componentWillUnmount() {
        Location.stop();
        this.listener.remove();
    }

    render() {
        if(this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={StyleSheet.absoluteFill}>
                    <MapView
                        ref={ref => this.mapView = ref}
                        style={StyleSheet.absoluteFill}
                        location={this.state.location}
                        locationEnabled
                        zoomControlsDisabled
                        onStatusChange={this.onStatusChange}
                    >
                        <MapView.Cluster
                            onPress={this.onPress}
                            ref={ref => this.cluster = ref}
                            markers={this.markers}
                            renderMarker={this.renderMarker}
                        />
                    </MapView>
                    <View style={style.button}>
                        <TouchableOpacity onPress={this.location}>
                            <Image style={style.icon} source={icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}
