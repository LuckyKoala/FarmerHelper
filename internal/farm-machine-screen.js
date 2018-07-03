import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button, Icon,
    Item, Input,
    List, ListItem, Tabs, Tab,
    Footer, FooterTab,
    Card, CardItem, Left, Thumbnail, Body, Separator
} from 'native-base';
import { TouchableOpacity, SectionList } from 'react-native';
import SearchHeader from './component/search-dialog';
import db from './data/backend-interface';
import groupBy from 'lodash.groupby';

const machines = db.machine.getAll();

function transform(obj) {
    let arr = [];
    for(var i in obj) {
        arr.push({title: i, data: obj[i]});
    }
    return arr;
}

export default class FarmMachineScreen extends Component {
  render() {
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
                <Button active vertical>
                    <Icon active name="bicycle" />
                    <Text>农机</Text>
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
