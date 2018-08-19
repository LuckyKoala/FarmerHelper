import React, { Component  } from 'react';
import {
    Container, Header, Title,
    Text, Button, Icon,
    Left, Right, Body,
    Tabs, Tab,
    Footer, FooterTab
} from 'native-base';
import FarmerPostTab from './farmer-post-tab';
import FieldPostTab from './field-post-tab';
//import MachinePostTab from './machine-post-tab';

//<FarmerPostTab navigateTo={this.navigateTo.bind(this)} />
export default class PostScreen extends Component {
    needSync = false;

    navigateTo(name, param) {
        this.props.navigation.navigate(name, param);
    }

    sync() {
        if(!this.needSync) return false;
        const {navigation} = this.props;
        const data = navigation.getParam('data');
        console.log('PostScreen: '+JSON.stringify(data));
        this.needSync=false;
        return data;
    }

    //根据用户身份来显示对应的发布页面
    render() {
        this.needSync = true;

    return (
        <Container style={{backgroundColor: "#fff"}}>
            <Header>
                <Left />
                <Body>
                    <Title>农事发布</Title>
                </Body>
                <Right />
            </Header>
            <FieldPostTab navigateTo={this.navigateTo.bind(this)} sync={this.sync.bind(this)} />

        <Footer>
            <FooterTab>
                <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name="flame" />
                    <Text>首页</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                    <Icon name="map" />
                    <Text>地图</Text>
                </Button>
                <Button active vertical >
                    <Icon active name="add" />
                    <Text>发布</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('Message')}>
                    <Icon name="chatboxes" />
                    <Text>消息</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('UserHome')}>
                    <Icon name="person" />
                    <Text>我</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
