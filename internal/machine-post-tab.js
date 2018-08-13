import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Content, Form, Item, Input, Label, Button,
    Left, Right, Body, Title, Text, Toast
} from 'native-base';

export default class FieldPostTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            contact: '',
            coordinate: '',
            pos: ''
        };
    }

    async onSubmit(state) {
        let {title, desc, contact, coordinate, pos} = state;
    }


    render() {
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>标题</Label>
                        <Input
                            onChangeText={(text) => this.setState({title: text})}
                            value={this.state.title}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>描述</Label>
                        <Input
                            onChangeText={(text) => this.setState({desc: text})}
                            value={this.state.desc}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>联系方式</Label>
                        <Input
                            onChangeText={(text) => this.setState({contact: text})}
                            value={this.state.contact}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>地址</Label>
                        <Input
                            onChangeText={(text) => this.setState({pos: text})}
                            value={this.state.pos}
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
