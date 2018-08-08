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

    async onLogin(state) {
        let {username, password} = state;
        let userFound = await db.user.filter(obj => obj.username==username && obj.password==password);
        if(userFound.length != 0) {
            db.currentUser.update(0, { id: 0, userId: userFound[0].id });
            this.props.navigation.navigate('Home');
        } else {
            Toast.show({
                text: "用户名或密码错误!",
                buttonText: "确定",
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
