import React, { Component  } from 'react';
import {
    Container, Title, Content,
    Text, Button,
    Left, Right, Body,
    Input,
    List, ListItem
} from 'native-base';
import SearchHeader from './component/search-dialog';

const NO_RECORD = [{ desc: '无结果' }];

export default class SearchScreen extends Component {
  render() {
      const search = this.props.navigation.getParam('search');
      const table = db[search.category];
      const keyword = search.keyword;
      let items;
      items = table.filter(item => item.desc.includes(keyword));
      if(items.length===0) items=NO_RECORD;

    return (
      <Container style={{backgroundColor: "#fff"}}>
        <SearchHeader navigation={this.navigation} />

        <Content padder>
          <List dataArray={items}
                renderRow={(item) =>
                    <ListItem>
                        <Text>{item.desc}</Text>
                    </ListItem>
                }>
          </List>
        </Content>
      </Container>
    );
  }
}
