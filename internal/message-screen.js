import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Tabs, Tab, List, ListItem,
    Footer, FooterTab
} from 'native-base';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

export default class MessageScreen extends Component {
    showMessage(message) {
        this.props.navigation.navigate('MessageDetail', { messageBody: message});
    }

    newConversation() {
        //Navigate to full person list
        let search = {
            category: "person",
            keyword: ""
        };
        this.props.navigation.navigate('Search', { search });
    }

    state = {
        externalData: null,
    };

    async asyncLoadData() {
        let currentUserStatus = await db.currentUser.get(0);
        let currentUserId = currentUserStatus.userId;
        if(currentUserId == -1) {
            this.props.navigation.navigate('UserLogin');
            return null;
        } else {
            let messageObjs = await db.message.filter(m => m.persons.includes(currentUserId));
            let users = await db.user.getAll();
            messageObjs = messageObjs.map((v,i) => {
                let targetUser = users[v.persons.filter(i => i!=currentUserId)[0]];
                return {
                    target: targetUser.nickname,
                    val: v,
                    id: i
                };
            });
            return messageObjs;
        }
    }

    componentDidMount() {
        this._asyncRequest = this.asyncLoadData().then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );
    }

    render() {
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            let messageObjs = this.state.externalData;
            return (
                <Container style={{backgroundColor: "#fff"}}>
                    <Header>
                    <Left />
                    <Body>
                        <Title>消息</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.newConversation()}
                        >
                        <Icon name="add" />
                        </Button>
                    </Right>
                    </Header>

                    <Content padder>
                        <List dataArray={messageObjs}
                            renderRow={(item) =>
                            <ListItem>
                                <TouchableOpacity onPress={() => this.showMessage(item)}>
                                    <Text>{item.target}</Text>
                                </TouchableOpacity>
                            </ListItem>
                            }>
                        </List>

                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon name="md-sunny" />
                                <Text>农事</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                                <Icon name="map" />
                                <Text>地图</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate('Post')}>
                                <Icon name="add" />
                                <Text>发布</Text>
                            </Button>
                            <Button active vertical>
                                <Icon active name="chatboxes" />
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
