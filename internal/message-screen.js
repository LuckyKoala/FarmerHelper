import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Tabs, Tab, List, ListItem,
    Footer, FooterTab
} from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class MessageScreen extends Component {
    showMessage(message) {
        this.props.navigation.navigate('MessageDetail', { messageBody: message});
    }


  render() {
      const currentUser = db.user.filter(p => p.username==="admin")[0];
      let messageObjs;
      if(currentUser===undefined) {
          messageObjs = [];
      } else {
          const uid = currentUser.id;
          messageObjs = db.message.filter(m => m.persons.includes(uid)).map((v,i) => {
              return {
                  target: db.user.get(v.persons.filter(i => i!=uid)[0]).nickname,
                  val: v,
                  id: i
              };
          });
      }

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
                    <Icon name="flame" />
                    <Text>农事</Text>
                </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
            <Icon name="map" />
            <Text>地图</Text>
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
