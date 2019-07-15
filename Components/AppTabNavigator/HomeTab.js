import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Icon, Thumbnail } from 'native-base'; // Container, Content 추가로 import
import CardComponent from '../CardComponent'; // 카드 컴포넌트 추가



export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }} />
        )
    }

    state = {
        feeds: [],
        followings: []
    }

    fetchFeeds() {
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_discussions_by_created",
              [{ tag: "kr", limit: 20 }]
            ]
        };
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    // 팔로잉 친구 가져오기
    fetchFollowing() {
        const data = {
            id: 2,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "follow_api",
              "get_following",
              ["anpigon", "", "blog", 10]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result.map(({following}) => following))
    }

    fetchFollowing() {
        const data = {
            id: 2,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "follow_api",
              "get_following",
              ["anpigon", "", "blog", 10]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result.map(({following}) => following))
    }

    

    componentWillMount() {
        this.fetchFeeds().then(feeds => {

            this.setState({
              feeds
            })
        });

        // 팔로잉 친구 가져오기
        this.fetchFollowing().then(followings => {
            this.setState({
            followings
            })
        });
    }

    render() {

        return (
            <Container style={style.container}>
                <Content>

                    {/* 여기부터 스토리 헤더 시작 */}
                        <View style={{ height: 100 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
                                <Text style={{ fontWeight: 'bold' }}>Stories</Text>

                                <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                                <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
                                <Text style={{ fontWeight: 'bold' }}> Watch All</Text>
                                </View>
                            </View>

                            <View style={{ flex: 3 }}>
                                <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}>
                                {
                                    this.state.followings.map(following => <Thumbnail 
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={{uri: `https://steemitimages.com/u/${following}/avatar` }} />)
                                }
                                </ScrollView>
                            </View>
                        </View>
                    {/* 여기까지 스토리 헤더 끝 */}

                    {
                        this.state.feeds.map(feed => (
                          <CardComponent data={ feed } key={ feed.url }/>
                        ))
                    }
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
