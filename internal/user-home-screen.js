import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    List, ListItem,
    Thumbnail,
    Footer, FooterTab
} from 'native-base';
import UserLogin from './user-login-screen';

export default class UserHomeScreen extends Component {
    state = {
        externalData: null,
    };

    async asyncLoadData() {
        let status = await db.currentUser.get(0);
        let uid = status.userId;
        if(uid==-1) {
            return false;
        } else {
            let user = await db.user.get(uid);
            return user.nickname;
        }
    }
    componentDidMount() {
        this._asyncRequest = asyncLoadData().then(
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
        } else if(this.state.externalData === false) {
            return (
                <UserLogin />
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
                        >
                        <Icon name="settings" />
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
                            <Text>我的收藏</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Icon name="cart" />
                            </Left>
                            <Body>
                            <Text>我的钱包</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Icon name="person" />
                            </Left>
                            <Body>
                            <Text>信用评级</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Icon name="archive" />
                            </Left>
                            <Body>
                            <Text>历史记录</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Icon name="medkit" />
                            </Left>
                            <Body>
                            <Text>帮助</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Icon name="hand" />
                            </Left>
                            <Body>
                            <Text>反馈/投诉</Text>
                            </Body>
                        </ListItem>
                        </List>
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon name="flame" />
                                <Text>农事</Text>
                            </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                        <Icon name="map" />
                        <Text>地图</Text>
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

  render() {
    
  }
}
