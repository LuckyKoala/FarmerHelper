import React, { Component  } from 'react';
import {
    Container, Header, Body, Title,
    Left, Right
} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

export default class MessageDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = navigation.getParam('messageBody');
    }

  onSend(messages = []) {
      this.setState(previousState => {
          let messageObj = previousState.val;
          messageObj.records = GiftedChat.append(messageObj.records, messages);
          db.message.update(previousState.id, messageObj);
          return {
              id: previousState.id,
              val: messageObj,
              target: previousState.target
          };
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{this.state.target}</Title>
          </Body>
          <Right />
        </Header>

        <GiftedChat
            messages={this.state.val.records}
            onSend={messages => this.onSend(messages)}
            placeholder="请输入信息"
            user={{
                _id: 0,
            }}
        />

      </Container>
    );
  }
}
