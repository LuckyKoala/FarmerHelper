import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button,
    Left, Right, Body,
    Input,
    List, ListItem
} from 'native-base';
import {
    View, ActivityIndicator
} from 'react-native';
import SearchHeader from './component/search-dialog';

const NO_RECORD = [{ desc: '无结果' }];

export default class SearchScreen extends Component {
    state = {
        externalData: null,
    };

    async asyncLoadData() {
        const search = this.props.navigation.getParam('search');
        const table = db[search.category];
        const keyword = search.keyword;
        let items = await table.filter(item => item.desc.includes(keyword));
        if(items.length===0) items=NO_RECORD;

        return items;
    }

    componentDidMount() {
        this._asyncRequest = this.asyncLoadData().then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    render() {
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            let items = this.state.externalData;
            return (
                <Container style={{backgroundColor: "#fff"}}>
                    <SearchHeader navigation={this.navigation} />

                    <Content padder>
                        <List dataArray={items}
                            renderRow={(item) =>
                                <ListItem>
                                    <Text>{item.desc}</Text>
                                </ListItem>
                            }>
                        </List>
                    </Content>
                </Container>
            );
        }
    }
}
