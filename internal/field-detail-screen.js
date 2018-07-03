import React, { Component  } from 'react';
import {
    Container, Header, Title, Content,
    Text, Button, Icon,
    Left, Right, Body
} from 'native-base';

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
                    <Text style={{ fontWeight: 'bold' }}>地点： {field.pos}</Text>
                    <Text>{field.desc}</Text>
                    <Text>联系电话： {field.contact}</Text>
                    <Text>发布人： 张晓春</Text>
                </Content>
            </Container>
        );
  }
}
