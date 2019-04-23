import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

// var movies_data = [
//     {
//         title: '电影名称',
//         year: '2019年',
//         posters: {
//             thumbnail: 'http://img06file.tooopen.com/images/20171228/tooopen_sy_231281461769.jpg',
//         },
//     },
// ];

export default class MoviesApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    movies: this.state.movies.concat(responseData.movies),
                    loaded: true,
                });
            });
    };
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <FlatList data={this.state.movies} renderItem={this.renderMovie} style={styles.list} keyExtractor={item => item.id} />
            // <View style={styles.container}>
            //     <Image source={{ uri: movie.posters.thumbnail }} style={styles.thumbnail} />
            //     <View style={styles.rightContainer}>
            //         <Text style={styles.title}>{movie.title}</Text>
            //         <Text style={styles.year}>{movie.year}</Text>
            //     </View>
            // </View>
        );
    }
    renderLoadingView = () => {
        return (
            <View style={styles.container}>
                <Text>Loading movies...</Text>
            </View>
        );
    };

    renderMovie = ({ item }) => {
        return (
            <View style={styles.container}>
                <Image source={{ uri: item.posters.thumbnail }} style={styles.thumbnail} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>
            </View>
        );
    };
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    rightContainer: {
        flex: 1,
        backgroundColor: '#AAAAAA',
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    list: {
        marginTop: 88,
        marginBottom: 34,
        // padding: 10,
        backgroundColor: '#839099',
    },
});
