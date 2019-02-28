import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

const instructions = Platform.select({
    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
});

interface Props {}

export default class App extends Component<Props> {
    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

interface Style {
    container: ViewStyle;
    instructions: TextStyle;
    welcome: TextStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
});
