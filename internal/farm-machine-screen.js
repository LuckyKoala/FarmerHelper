import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button, Icon,
    Item, Input,
    List, ListItem, Tabs, Tab,
    Footer, FooterTab,
    Card, CardItem, Left, Thumbnail, Body, Separator
} from 'native-base';
import { TouchableOpacity, SectionList, View, ActivityIndicator } from 'react-native';
import SearchHeader from './component/search-dialog';
import groupBy from 'lodash.groupby';

function transform(obj) {
    let arr = [];
    for(var i in obj) {
        arr.push({title: i, data: obj[i]});
    }
    return arr;
}

export default class FarmMachineScreen extends Component {
    state = {
        externalData: null,
    };

    componentDidMount() {
        this._asyncRequest = db.machine.getAll().then(
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
        // Render real UI ...
        let machines = this.state.externalData;
        return (
            <Container style={{backgroundColor: "#fff"}}>
                <SearchHeader navigation={this.props.navigation} selected='machine' />

                <Content padder>
                    <Tabs>
                        <Tab heading="品牌">
                            <SectionList
                                renderItem={({item, index, section}) =>
                                    <Card>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{uri: item.image}} />
                                                <Body>
                                                    <Text>{item.brands+item.model+item.category}</Text>
                                                    <Text note>参考价格: {item.price}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                    </Card>}
                                renderSectionHeader={({section: {title}}) => (
                                    <Separator bordered>
                                        <Text>{title}</Text>
                                    </Separator>
                                )}
                                sections={ transform(groupBy(machines, 'brands')) }
                                keyExtractor={(item, index) => item + index}
                            />
                        </Tab>

                        <Tab heading="分类">
                            <SectionList
                                renderItem={({item, index, section}) =>
                                    <Card>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{uri: item.image}} />
                                                <Body>
                                                    <Text>{item.brands+item.model+item.category}</Text>
                                                    <Text note>参考价格: {item.price}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                    </Card>}
                                renderSectionHeader={({section: {title}}) => (
                                    <Separator bordered>
                                        <Text>{title}</Text>
                                    </Separator>
                                )}
                                sections={ transform(groupBy(machines, 'category')) }
                                keyExtractor={(item, index) => item + index}
                            />
                        </Tab>
                    </Tabs>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name="flame" />
                            <Text>首页</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                            <Icon name="map" />
                            <Text>地图</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Post')}>
                            <Icon name="add" />
                            <Text>发布</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Message')}>
                            <Icon name="chatboxes" />
                            <Text>消息</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('UserHome')}>
                            <Icon name="person" />
                            <Text>我</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
        }
    }
}
