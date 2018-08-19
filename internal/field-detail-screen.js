import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body,
    Card, CardItem, Thumbnail
} from 'native-base';
import { Image, View, ActivityIndicator } from 'react-native';

export default class FieldDetailScreen extends Component {
    state = {
        externalData: null,
    };

    async asyncLoadData() {
        const field = this.props.navigation.getParam('field');
        let uid = field.uid;
        if(uid==null || uid==-1) return '佚名';
        let user = await db.user.get(uid);
        return user.nickname;
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
        if (this.state.externalData === null) {
            return (
                <View style={[helperStyles.container, helperStyles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            const { navigation } = this.props;
            const field = navigation.getParam('field');
            let nickname = this.state.externalData;

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
                                    <Text>{nickname}</Text>
                                    <Text note>{field.date}</Text>
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
                            <Right>
                    <Button transparent textStyle={{color: '#87838B'}}
                        onPress={() => this.props.navigation.navigate('Map', {center: field.coordinate})}>
                                    <Icon name="md-map" />
                                    <Text>{field.pos || field.coordinate && field.coordinate.address}</Text>
                                </Button>
                            </Right>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        }
    }

}
