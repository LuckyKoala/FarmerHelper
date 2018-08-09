import React, { Component } from 'react';
import { View } from 'react-native';
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

        if(username.trim()==='' || password.trim()==='') {
            Toast.show({
                text: "用户名和密码不能为空!",
                buttonText: "确定",
                type: "danger",
                duration: 3000
            });
            return;
        }

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
                <Content>
                    <Form>
                        <Button transparent info style={{
                            alignSelf: 'flex-end'
                        }}>
                            <Text>忘记密码</Text>
                        </Button>
                        <Item floatingLabel>
                        <Label>用户名</Label>
                        <Input
                            onChangeText={(text) => this.setState({username: text})}
                            value={this.state.username}
                        />
                        </Item>
                        <Item floatingLabel last>
                        <Label>密码</Label>
                        <Input
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                        />
                        </Item>
                    </Form>
                    <View style={{marginTop: 100}}>
                        <Button
                            block
                            style={{backgroundColor: '#34A853'}}
                            onPress={() => this.onLogin(this.state)}
                        >
                            <Text style={{fontSize: 20, color: '#FFF'}}>登录</Text>
                        </Button>
                        <Button
                            block
                            transparent>
                            <Text style={{fontSize: 20, color: '#595856'}}>注册</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
  }
}
