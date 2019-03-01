import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button,
    Left, Right, Body,
    Input,
    List, ListItem
} from 'native-base';
import {
    View, ActivityIndicator, TouchableOpacity
} from 'react-native';
import SearchHeader from './component/search-dialog';

const NO_RECORD = [{ desc: '无结果' }];

export default class SearchScreen extends Component {
    state = {
        externalData: null,
    };

    async asyncLoadData(search) {
        const table = db[search.category];
        const keyword = search.keyword;
        let items = await table.filter(item => item.desc.includes(keyword));
        if(items.length===0) items=NO_RECORD;

        return {
            category: search.category,
            items: items
        };
    }

    componentDidMount() {
        this.refresh(this.props.navigation.getParam('search'));
    }

    refresh(search) {
        this._asyncRequest = this.asyncLoadData(search).then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );
    }

    showField(field) {
        this.props.navigation.navigate('FieldDetail', { field});
    }

    showMachine(machine) {
        this.props.navigation.navigate('MachineDetail', { machine });
    }

    openConversation(person) {
        this.props.navigation.navigate('MessageDetail', {
            targetId: person.personId,
            messageBody: { id: -1 }
        });
    }

    show(name, val) {
        if(name==='field') this.showField(val);
        else if(name==='person') this.openConversation(val);
    }

    render() {
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            let {category, items} = this.state.externalData;
            return (
                <Container style={{backgroundColor: "#fff"}}>
                    <SearchHeader refresh={this.refresh.bind(this)} navigation={this.props.navigation} />

                    <Content padder>
                        <List dataArray={items}
                            renderRow={(item) =>
                                <ListItem>
                                       <TouchableOpacity onPress={() => this.show(category, item)}>
                                       <Text>{item.nick || ""} {item.desc}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            }>
                        </List>
                    </Content>
                </Container>
            );
        }
    }
}
