import React, { Component } from 'react';
import {
    Header, Item, Input, Icon,
    Button, Picker, Form
} from 'native-base';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class SearchDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'field',
            text: ''
        };
        if(this.props.selected!==undefined) this.state.selected = this.props.selected;
    }

    onValueChange(value: string) {
        this.setState({
            selected: value,
        });
    }

    render() {
        return (
            <Header searchBar rounded>
                <Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="请选择搜索项"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="农田" value="field" />
                            <Picker.Item label="农机" value="machine" />
                            <Picker.Item label="农友" value="person" />
                        </Picker>
                    <Input placeholder="请输入搜索关键词"
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                    />
                <Button transparent onPress={() => this.props.navigation.navigate('Search', { search: { category: this.state.selected, keyword: this.state.text } })}>
                        <Icon active name="search" />
                    </Button>
                </Item>
            </Header>
        );
    }
}
