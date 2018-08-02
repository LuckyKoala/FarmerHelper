import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Footer, FooterTab
} from 'native-base';

export default class PostScreen extends Component {
  render() {
    return (
      <Container style={{backgroundColor: "#fff"}}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>发布</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Content goes here</Text>
        </Content>

        
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
