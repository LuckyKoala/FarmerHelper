import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon, 
    Left, Right, Body
} from 'native-base';

export default class MapScreen extends Component {
  render() {
    return (
      <Container style={{backgroundColor: "#fff"}}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>地图</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>暂不支持</Text>
        </Content>
      </Container>
    );
  }
}
