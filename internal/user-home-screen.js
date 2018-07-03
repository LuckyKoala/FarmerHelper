import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    List, ListItem,
    Thumbnail,
    Footer, FooterTab
} from 'native-base';

export default class UserHomeScreen extends Component {
  render() {
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
                   <Text>张小白</Text>
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
                    <Text>首页</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('FarmMachine')}>
                    <Icon name="bicycle" />
                    <Text>农机</Text>
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
