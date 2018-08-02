import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    List, ListItem,
    Footer, Item, Input
} from 'native-base';

export default class MessageDetailScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            text: '',
            message: navigation.getParam('message')
        };
    }

    render() {

        return (
            <Container style={{backgroundColor: "#fff"}}>
                <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="return-left" />
                    </Button>
                </Left>
                <Body>
                <Title>与 {this.state.message.target} 的聊天</Title>
                </Body>
                <Right />
                </Header>

                <Content padder>
                    <List dataArray={this.state.message.records}
                        renderRow={(item) =>
                            <ListItem>
                                <Text>{item.content}</Text>
                                <Text> Sent by {item.sender}</Text>
                            </ListItem>
                        }>
                    </List>
                
                <Item>
                <Input placeholder=""
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button transparent onPress={() => {
                    this.state.message.records.push({
                        sender: -1,
                        content: this.state.text
                    });
                    this.setState({
                        text: '',
                        message: this.state.message
                    });
                }}>
                <Icon active name="return-left" />
                </Button>
                </Item>

                </Content>

            </Container>
        );
  }
}
