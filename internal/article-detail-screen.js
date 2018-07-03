import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body
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
                    <Text style={{ fontWeight: 'bold' }}>{article.title}</Text>
                    <Image
                        style={{ width: BannerWidth, height: BannerHeight }}
                        source={{ uri: article.image }}
                    />
                    <Text>{article.content}</Text>
                </Content>
            </Container>
        );
  }
}
