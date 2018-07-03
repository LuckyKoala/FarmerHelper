import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const drawerCover = require("../../assets/drawer-cover.png");
const drawerImage = require("../../assets/logo-kitchen-sink.png");
const datas = [
  {
    name: "首页",
    route: "Home",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "用户中心",
    route: "UserHome",
    icon: "person",
    bg: "#B89EF5",
  },
  {
    name: "搜索",
    route: "Search",
    icon: "search",
    bg: "#C5F442"
  },
  {
    name: "发布",
    route: "Post",
    icon: "bookmarks",
    bg: "#477EEA",
  },
  {
    name: "农机",
    route: "FarmMachine",
    icon: "pint",
    bg: "#DA4437",
  },
  {
    name: "地图",
    route: "Map",
    icon: "map",
    bg: "#4DCAE0"
  },
  {
    name: "消息",
    route: "Message",
    icon: "chatboxes",
    bg: "#1EBC7C",
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
