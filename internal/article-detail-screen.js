import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Card, CardItem, Thumbnail
} from 'native-base';
import { Dimensions, View, Image } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

export default class ArticleDetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const article = navigation.getParam('article');

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
                    <Title>文章详情</Title>
                </Body>
                <Right />
                </Header>

                <Content padder>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'Image URL'}} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>April 15, 2016</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontWeight: 'bold' }}>{article.title}</Text>
                                <Image source={{uri: article.image}} style={{height: BannerHeight, width: BannerWidth, flex: 1}}/>
                                <Text>
                                    {article.content}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
  }
}
