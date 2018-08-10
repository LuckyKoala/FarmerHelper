import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Content, Form, Item, Input, Label, Button,
    Left, Right, Body, Title, Text, Toast
} from 'native-base';
import UserLogin from './user-login-screen';

export default class UserRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            nickname: '',
            password: '',
            repeatPassword: '',
            hasRegister: false
        };
    }

    async onRegister(state) {
        let {username, password, repeatPassword, nickname} = state;

        if(username.trim()==='' || password.trim()==='') {
            Toast.show({
                text: "用户名和密码不能为空!",
                buttonText: "确定",
                type: "danger",
                duration: 3000
            });
            return;
        }

        if(password!==repeatPassword) {
            Toast.show({
                text: "密码与确认密码不同，请重新输入!",
                buttonText: "确定",
                type: "danger",
                duration: 3000
            });
            return;
        }

        let userFound = await db.user.filter(obj => obj.username==username);
        if(userFound.length != 0) {
            Toast.show({
                text: "用户已存在，请更改用户名或尝试登录。",
                buttonText: "确定",
                type: "danger",
                duration: 3000
            });
            return;
        } else {
            await db.user.add({
                username, password, nickname
            });
            Toast.show({
                text: "注册成功!",
                buttonText: "确定",
                type: "success",
                duration: 1500
            });
            this.setState({hasLogin: true});
        }
    }


    render() {
        if(this.state.hasLogin) {
            return (
                <UserLogin />
            );
        }

        return (
            <Container>
                <Content>
                    <Form>
                        <Button
                            onPress={() => this.props.navigation.navigate('UserLogin')}
                            transparent info style={{
                                alignSelf: 'flex-end'
                        }}>
                            <Text>用户登录</Text>
                        </Button>
                        <Item floatingLabel>
                            <Label>用户名</Label>
                            <Input
                                onChangeText={(text) => this.setState({username: text})}
                                value={this.state.username}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>昵称</Label>
                            <Input
                        onChangeText={(text) => this.setState({nickname: text})}
                        value={this.state.nickname}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>密码</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>确认密码</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({repeatPassword: text})}
                                value={this.state.repeatPassword}
                            />
                        </Item>
                    </Form>
                    <View style={{marginTop: 100}}>
                        <Button
                            block
                            style={{backgroundColor: '#34A853'}}
                            onPress={() => this.onRegister(this.state)}
                        >
                            <Text style={{fontSize: 20, color: '#FFF'}}>提交</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
  }
}
