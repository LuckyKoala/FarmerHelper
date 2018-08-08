import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button, Icon, Tabs, Tab, List, ListItem,
    Toast, Card, CardItem, Left, Body,
    Footer, FooterTab
} from 'native-base';
import { Dimensions, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import SearchHeader from './component/search-dialog';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

export default class HomeScreen extends Component {
    showArticle(article) {
        this.props.navigation.navigate('ArticleDetail', { article: article });
    }
    
    showField(field) {
        this.props.navigation.navigate('FieldDetail', { field: field });
    }

    renderPage(article, index) {
        return (
                <TouchableOpacity onPress={() => this.showArticle(article)}>
                    <Card transparent>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{article.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                style={{ width: BannerWidth, height: BannerHeight }}
                                source={{ uri: article.image }}
                            />
                        </CardItem>
                    </Card>
                </TouchableOpacity>
        );
    }

    state = {
        externalData: null,
    };

    async asyncLoadData() {
        let articles = await db.article.getAll();
        let fields = await db.field.getAll();
        let persons = await db.person.getAll();
        return { articles, fields, persons };
    }

    componentDidMount() {
        this._asyncRequest = this.asyncLoadData().then(
            externalData => {
                this._asyncRequest = null;
                this.setState({externalData});
            }
        );
    }

    componentWillUnmount() {
        //if (this._asyncRequest) {
          //  this._asyncRequest.cancel();
        //}
    }

    render() {
        if (this.state.externalData === null) {
            return (
                    <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    </View>
            );
        } else {
            let { articles, fields, persons } = this.state.externalData;

            return (
            <Container style={{backgroundColor: "#fff"}}>
                <StatusBar hidden={true} />
                <SearchHeader navigation={this.props.navigation} />

                <Content padder>
                    <View style={{flex: 4, backgroundColor: 'skyblue'}}>
                        <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                        >
                        {articles.map((article, index) => this.renderPage(article, index))}
                        </Carousel>
                    </View>

                    <View style={{flex: 6, backgroundColor: 'steelblue'}}>
                    <Tabs>
                        <Tab heading="农田招人">
                        <List dataArray={fields}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => this.showField(item)}>
                                            <Text>{item.desc}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                            }>
                            </List>
                        </Tab>
                        <Tab heading="专业农友">
                        <List dataArray={persons}
                                renderRow={(item) =>
                                    <ListItem>
                                        <Text>{item.nick}  {item.desc}</Text>
                                    </ListItem>
                            }>
                            </List>
                        </Tab>
                    </Tabs>
                    </View>
                </Content>

                <Footer>
                <FooterTab>
                    <Button active vertical>
                    <Icon active name="flame" />
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
}
