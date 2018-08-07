import React from 'react';
import { Platform } from 'react-native';
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
	sync : {
		// we'll talk about the details later.
	}
});

global.storage = storage;

import db from './internal/data/backend-interface';

db.checkInitStatus();

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

const AppNavigator = StackNavigator(
    {
        UserLogin: { screen: UserLoginScreen },
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

export default class HomeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Root>
                <AppNavigator />
                </Root>
        );
    }
}

