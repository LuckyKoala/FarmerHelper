import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Content, Form, Item, Input, Label, Button,
    Left, Right, Body, Title, Text, Toast
} from 'native-base';

export default class FarmerPostTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            nick: '',
            age: '',
        };
    }

    async onSubmit(state) {
        let {desc, nick, age} = state;
        await db.person.add({
            desc, nick, age
        });
        Toast.show({
            text: "发布成功!",
            buttonText: "确定",
            type: "success",
            duration: 1500
        });
        this.props.navigateTo('Home');
    }


    render() {
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>昵称</Label>
                        <Input
                            onChangeText={(text) => this.setState({nick: text})}
                            value={this.state.nick}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>年龄</Label>
                        <Input
                            onChangeText={(text) => this.setState({age: text})}
                            value={this.state.age}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>描述</Label>
                        <Input
                            onChangeText={(text) => this.setState({desc: text})}
                            value={this.state.desc}
                        />
                    </Item>
                </Form>
                <View style={{marginTop: 100}}>
                    <Button
                        block
                        style={{backgroundColor: '#34A853'}}
                        onPress={() => this.onSubmit(this.state)}
                    >
                        <Text style={{fontSize: 20, color: '#FFF'}}>提交</Text>
                    </Button>
                </View>
            </Content>
        );
  }
}
