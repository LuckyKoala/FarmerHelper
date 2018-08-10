import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Card, CardItem, Thumbnail
} from 'native-base';
import { Image } from 'react-native';

export default class FieldDetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const field = navigation.getParam('field');

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
                    <Title>农事详情</Title>
                </Body>
                <Right />
                </Header>

                <Content padder>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>April 15, 2016</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Inernet.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                                <Text>
                                    {field.desc}
                                </Text>
                                <Text>联系电话： {field.contact}</Text>
                                <Text>发布人： 张晓春</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}}>
                            <Icon name="logo-github" />
                                <Text>{field.pos}</Text>
                            </Button>
                        </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
  }
}
