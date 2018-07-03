import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Tabs, Tab, List, ListItem,
    Footer, FooterTab
} from 'native-base';

import db from './data/backend-interface';

const currentUser = db.user.filter(p => p.username==="admin")[0];
let friends;
if(currentUser===undefined) {
    friends = [];
} else {
    const users = db.user.getAll();
    friends = currentUser.friends.map((i,v) => users[v]);
}

export default class MessageScreen extends Component {
  render() {
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
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Tabs>
            <Tab heading="好友">
               <List dataArray={friends}
                        renderRow={(item) =>
                            <ListItem>
                                <Text>{item.username}</Text>
                            </ListItem>
                    }>
               </List>
            </Tab>
            <Tab heading="动态">
                <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
            </Tab>
          </Tabs>
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
