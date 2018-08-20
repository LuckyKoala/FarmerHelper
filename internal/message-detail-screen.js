import React, { Component  } from 'react';
import {
    Container, Header, Body, Title,
    Left, Right
} from 'native-base';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class MessageDetailScreen extends React.Component {
    state = {
        externalData: null
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.targetId = navigation.getParam('targetId');
        let body = navigation.getParam('messageBody');
        console.log(`body: ${JSON.stringify(body)}`);
        if(body.id!==-1) {
            this.state = body;
        }
    }

    async onSend(messages = []) {
        let previousState = this.state;
        console.log("Update existed message");
        let messageObj = previousState.val;
        messageObj.records = GiftedChat.append(messageObj.records, messages);
        if(messageObj.id === undefined) {
            //So this is a brand new conversation, let's add it to storage
            let id = db.message.add(messageObj);
            previousState.id = id;
        } else {
            db.message.update(previousState.id, messageObj);
        }
        this.setState({
            id: previousState.id,
            val: messageObj,
            target: previousState.target
        });
    }

    async asyncLoadData() {
        let currentUserStatus = await db.currentUser.get(0);
        let currentUserId = currentUserStatus.userId;
        this.userId = currentUserId;
        console.log(`userId: ${this.userId}`);
        if(this.state.externalData === null) {
            let targetUser = await db.user.get(this.targetId);
            console.log("New message");
            //new message
            let messageFound = await db.message.filter(v => v.persons.includes(this.userId) && v.persons.includes(this.targetId));
            if(messageFound.length === 1) {
                let message = messageFound[0];
                this.setState({
                    id: message.id,
                    val: message,
                    target: targetUser.nickname
                });
            } else {
                let messageObj = {
                    persons: [this.userId, this.targetId],
                    records: [],
                };
                console.log(messageObj);
                this.setState({
                    val: messageObj,
                    target: targetUser.nickname
                });
            }
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
        console.log(`state: ${JSON.stringify(this.state)}`);
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
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
                            _id: this.userId,
                        }}
                    />

                </Container>
            );
        }
    }
}
