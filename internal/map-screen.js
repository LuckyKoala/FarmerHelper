import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Footer, FooterTab
} from 'native-base';

export default class MapScreen extends Component {
  render() {
    return (
      <Container style={{backgroundColor: "#fff"}}>
        <Header>
          <Left />
          <Body>
            <Title>地图</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>暂不支持</Text>
        </Content>

            <Footer>
            <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="flame" />
            <Text>农事</Text>
            </Button>
            <Button active vertical>
            <Icon active name="map" />
            <Text>地图</Text>
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
