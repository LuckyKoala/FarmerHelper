import React from 'react';
import { Platform } from 'react-native';
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Expo, { Font, AppLoading } from "expo";

import HomeScreen from './internal/home-screen';
import SearchScreen from './internal/search-screen';
import PostScreen from './internal/post-screen';
import FarmMachineScreen from './internal/farm-machine-screen';
import MapScreen from './internal/map-screen';
import MessageScreen from './internal/message-screen';
import UserHomeScreen from './internal/user-home-screen';

import ArticleDetailScreen from './internal/article-detail-screen';
import FieldDetailScreen from './internal/field-detail-screen';
import MachineDetailScreen from './internal/machine-detail-screen';
import UserLoginScreen from './internal/user-login-screen';

import SideBar from './internal/sidebar';

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
        Post: PostScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: "none"
    }
);

export default class HomeNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return (
                    <Root>
                    <AppLoading />
                    </Root>
            );
        }
        return (
                <Root style={{paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <AppNavigator />
                </Root>
        );
    }
}

