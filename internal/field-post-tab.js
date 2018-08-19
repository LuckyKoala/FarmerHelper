import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Content, Form, Item, Input, Label, Button,
    Left, Right, Body, Title, Text, Toast, Icon
} from 'native-base';

export default class FieldPostTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            contact: '',
            coordinate: {},
            uid: '',
            date: ''
        };
    }

    async onSubmit(state) {
        let {title, desc, contact, coordinate} = state;
        if(title.trim() === '') {
            Toast.show({
                text: "标题不能为空!",
                buttonText: "确定",
                type: "success",
                duration: 1500
            });
            return;
        }
        let currentUser = await db.currentUser.get(0);
        let uid = currentUser.userId;
        let dateObj = new Date();
        let date = dateObj.getFullYear()+'.'+dateObj.getMonth()+'.'+dateObj.getDate();
        await db.field.add({
            title, desc, contact, coordinate, uid, date
        });
        Toast.show({
            text: "发布成功!",
            buttonText: "确定",
            type: "success",
            duration: 1500
        });
        this.props.navigateTo('Home');
    }

    trySync() {
        let data = this.props.sync();
        if(data) {
            console.log("set state");
            this.setState(data);
            console.log("Address: "+this.state.coordinate.address);
        }
    }

    render() {
        this.trySync();

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
                    <Item style={{marginTop: 18}}>
                        <Input
                            editable={false}
                            placeholder='地址'
                            value={this.state.coordinate.address}
                        />
                        <Button onPress={() => this.props.navigateTo('MapSearch', {data: this.state})}>
                            <Icon name="md-search" />
                        </Button>
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
