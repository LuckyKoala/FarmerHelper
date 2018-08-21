import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    List, ListItem,
    Thumbnail,
    Footer, FooterTab,
    ActionSheet
} from 'native-base';
import {
    View, ActivityIndicator, TouchableOpacity
} from 'react-native';

export default class UserHomeScreen extends Component {
    state = {
        externalData: null,
    };

    async asyncLoadData() {
        let status = await db.currentUser.get(0);
        let uid = status.userId;
        if(uid==-1) {
            this.props.navigation.navigate('UserLogin');
            return null;
        } else {
            let user = await db.user.get(uid);
            return user.nickname;
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

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    async logout() {
        await db.currentUser.update(0, {id: 0, userId: -1});
        this.props.navigation.navigate('UserLogin');
    }

    onClick(action) {
        console.log(action);
        switch(action) {
        case 'about':
            ActionSheet.show(
              {
                  options: ["版本更新","帮助","反馈","取消"],
                cancelButtonIndex: 4,
                title: "版本 v0.4.1"
              },
              buttonIndex => {
                  console.log(buttonIndex);
                  //this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            );
            break;
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
            let nickname = this.state.externalData;
            return (
                <Container style={{backgroundColor: "#fff"}}>
                    <Header>
                    <Left />
                    <Body>
                        <Title>用户中心</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.logout()}
                        >
                            <Icon name="md-exit" />
                        </Button>
                    </Right>
                    </Header>

                    <Content padder>
                        <List>
                        <ListItem avatar>
                            <Left>
                            <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} />
                            </Left>
                            <Body>
                                <Text>{nickname}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="bookmark" />
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.onClick("collection")}>
                                    <Text>我的收藏</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="cart" />
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.onClick("wallet")}>
                                    <Text>我的钱包</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="person" />
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.onClick("credit")}>
                                    <Text>信用评级</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="archive" />
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.onClick("archive")}>
                                    <Text>历史记录</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="ios-information-circle" />
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.onClick("about")}>
                                    <Text>关于农事帮与帮助</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>
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
                            <Button vertical onPress={() => this.props.navigation.navigate('Message')}>
                                <Icon name="chatboxes" />
                                <Text>消息</Text>
                            </Button>
                            <Button active vertical>
                                <Icon active name="person" />
                                <Text>我</Text>
                            </Button>
                        </FooterTab>
                </Footer>


                </Container>
                );
        }
    }
}
