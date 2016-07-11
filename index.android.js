/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, ListView} from "react-native";

class AndroidProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

class Greeting extends Component {
    render() {
        return (
            <Text>Hello {this.props.name}!</Text>
        );
    }
}

class LotsOfGreetings extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Greeting name='Rexxar'/>
                <Greeting name='Jaina'/>
                <Greeting name='Valeera'/>
            </View>
        );
    }
}

class HelloWorldProject extends Component {
    render() {
        let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
        return (
            <Image source={pic} style={{width:193,height:110}}></Image>
        );
    }
}

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        //Toggle the state every second
        setInterval(()=> {
            this.setState({showText: !this.state.showText});
        }, 1000)

    }

    render() {
        let display = this.state.showText ? this.props.text : '';
        return (
            <Text>{display}</Text>
        );
    }

}

class BlinkApp extends Component {
    render() {
        return (
            <View>
                <Blink text='I love to blink'></Blink>
                <Blink text='Yes blinking is so great'></Blink>
            </View>
        );
    }
}

class LotsOfStyles extends Component {
    render() {
        return (
            <View>
                <Text style={styles.red}>Just Red</Text>
                <Text style={styles.bigblue}>Just BigBlue</Text>
            </View>
        );
    }
}

class FixedDimensionsBasics extends Component {
    render() {
        return (
            // Try removing the `flex: 1` on the parent View.
            // The parent will not have dimensions, so the children can't expand.
            // What if you add `height: 300` instead of `flex: 1`?
            <View style={{flex:1}}>
                <View style={{width:50,height:50,backgroundColor:'powderblue'}}></View>
                <View style={{width:100,height:100,backgroundColor:'skyblue'}}></View>
                <View style={{width:150,height:150,backgroundColor:'steelblue'}}></View>
                <View style={{flex:1,backgroundColor:'powderblue'}}></View>
                <View style={{flex:2,backgroundColor:'skyblue'}}></View>
                <View style={{flex:3,backgroundColor:'steelblue'}}></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:50,height:50,backgroundColor:'powderblue'}}></View>
                    <View style={{width:50,height:50,backgroundColor:'skyblue'}}></View>
                    <View style={{width:50,height:50,backgroundColor:'steelblue'}}></View>
                </View>
            </View>


        );
    }
}

class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{padding:10}}>
                <TextInput style={{height:40}} placeholder="Type here to translate!"
                           onChangeText={(text)=>this.setState({text})}/>
                <Text style={{padding:10,fontSize:42}}>
                    {this.state.text.split(' ').map((word)=>word && '&').join(' ')}
                </Text>
            </View>
        );
    }
}

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
    render() {
        return (
            <ScrollView>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
                <Image source={require('./img/imag1.jpg')}></Image>
            </ScrollView>
        );
    }
}

class ListViewBasics extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 != r2});
        this.state = {
            dateSource: ds.cloneWithRows(
                ['John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin']
            )
        };
    }

    render() {
        return (
            <View style={{paddingTop:20}}>
                <ListView dataSource={this.state.dateSource} renderRow={(rowData)=><Text>{rowData}</Text>}></ListView>
            </View>
        );
    }
}

var MOCKED_MOVIES_DATA = [
    {title: '标题', releaseYear: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'http://facebook.github.io/react-native/movies.json';

class MovieView extends Component {
    constructor(props) {
        super(props);   //这一句不能省略，照抄即可
        this.state = {
            movies: null,  //这里放你自己定义的state变量及初始值
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }

    //componentDidMount是React组件的一个生命周期方法，它会在组件刚加载完成的时候调用一次，以后不会再被调用。
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    movies: responseData.movies,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.movies) {
            return this.renderLoadingView();
        }
        // var movie = this.state.movies[0];
        // return this.renderMovie(movie);
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={require('./img/imag1.jpg')}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.releaseYear}</Text>
                </View>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    // renderMovie(movie) {
    //     return (
    //         <View style={styles.container}>
    //             <Image
    //                 source={require('./img/imag1.jpg')}
    //                 style={styles.thumbnail}
    //             />
    //             <View style={styles.rightContainer}>
    //                 <Text style={styles.title}>{movie.title}</Text>
    //                 <Text style={styles.year}>{movie.releaseYear}</Text>
    //             </View>
    //         </View>
    //     );
    // }
}

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});

AppRegistry.registerComponent('AndroidProject', () => LoginView);
