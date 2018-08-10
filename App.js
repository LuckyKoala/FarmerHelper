import React from 'react';
import { Platform, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import { Initializer } from 'react-native-baidumap-sdk';
Initializer.init('No ios').catch(e => console.error(e));

import db from './internal/data/backend-interface';
global.db = db;

import HomeScreen from './internal/home-screen';
import SearchScreen from './internal/search-screen';
import PostScreen from './internal/post-screen';
import FarmMachineScreen from './internal/farm-machine-screen';
import MapScreen from './internal/map-screen';
import MessageScreen from './internal/message-screen';
import UserHomeScreen from './internal/user-home-screen';

import ArticleDetailScreen from './internal/article-detail-screen';
import FieldDetailScreen from './internal/field-detail-screen';
import MessageDetailScreen from './internal/message-detail-screen';
import MachineDetailScreen from './internal/machine-detail-screen';
import UserLoginScreen from './internal/user-login-screen';
import UserRegisterScreen from './internal/user-register-screen';

const AppWithLoginNavigator = StackNavigator(
    {
        UserLogin: { screen: UserLoginScreen },
        UserRegister: { screen: UserRegisterScreen },
        Home: HomeScreen,
        Message: MessageScreen,
        UserHome: UserHomeScreen,
        FarmMachine: FarmMachineScreen,
        Search: SearchScreen,

        ArticleDetail: { screen: ArticleDetailScreen },
        FieldDetail: { screen: FieldDetailScreen },
        MachineDetail: { screen: MachineDetailScreen },
        MessageDetail: MessageDetailScreen,
        Post: PostScreen,
        Map: MapScreen
    },
    {
        initialRouteName: 'UserLogin',
        headerMode: "none"
    }
);

const AppNavigator = StackNavigator(
    {
        UserLogin: { screen: UserLoginScreen },
        UserRegister: { screen: UserRegisterScreen },
        Home: HomeScreen,
        Message: MessageScreen,
        UserHome: UserHomeScreen,
        FarmMachine: FarmMachineScreen,
        Search: SearchScreen,

        ArticleDetail: { screen: ArticleDetailScreen },
        FieldDetail: { screen: FieldDetailScreen },
        MachineDetail: { screen: MachineDetailScreen },
        MessageDetail: MessageDetailScreen,
        Post: PostScreen,
        Map: MapScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: "none"
    }
);

global.helperStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default class HomeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        externalData: null,
    };

    async componentDidMount() {
        await db.article.init();
        await db.user.init();
        await db.field.init();
        await db.person.init();
        await db.machine.init();
        await db.message.init();
        await db.currentUser.init();

        this._asyncRequest = db.currentUser.get(0).then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );
    }

    componentWillUnmount() {
//        if (this._asyncRequest) {
  //          this._asyncRequest.cancel();
    //    }
    }

    render() {
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else if(this.state.externalData.userId != -1) {
            return (
                <Root>
                    <AppNavigator />
                </Root>
            );
        } else {
            return (
                <Root>
                    <AppWithLoginNavigator />
                </Root>
            );
        }
    }
}

