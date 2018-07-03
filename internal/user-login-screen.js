import React, { Component } from 'react';
import {
    Container, Header, Content, Form, Item, Input, Label, Button,
    Left, Right, Body, Title, Text, Toast
} from 'native-base';
export default class UserLoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onLogin(state) {
        let {username, password} = state;
        if(username==='admin' && password==='admin') {
            this.props.navigation.navigate('Drawer');
        } else {
            Toast.show({
                text: "用户名或密码错误!",
                buttonText: "了解",
                type: "danger",
                duration: 3000
            });
        }
    }


  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>用户登录</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>用户名</Label>
              <Input
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
              />
            </Item>
            <Item stackedLabel last>
              <Label>密码</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button
            full
            onPress={() => this.onLogin(this.state)}
          >
            <Text>登录</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
