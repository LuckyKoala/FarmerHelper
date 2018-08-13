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

export default class PostScreen extends Component {
    navigateTo(name) {
        this.props.navigation.navigate(name);
    }

  render() {
    return (
        <Container style={{backgroundColor: "#fff"}}>
            <Header hasTabs />
            <Tabs>
                <Tab heading="投递简历">
                    <FarmerPostTab navigateTo={this.navigateTo.bind(this)} />
                </Tab>
                <Tab heading="农事发布">
                    <FieldPostTab navigateTo={this.navigateTo.bind(this)} />
                </Tab>
            </Tabs>

        <Footer>
            <FooterTab>
                <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name="flame" />
                    <Text>首页</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('FarmMachine')}>
                    <Icon name="bicycle" />
                    <Text>农机</Text>
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
