import React, {Component} from 'react';
import { Alert, TextInput, View, TouchableHighlight, Text, AsyncStorage} from 'react-native';
import CustomFlatList  from './src/components/ResourcesList.js';
import StylesJS from './src/features/styles.js';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export default class App extends React.Component{
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.getResources = this.getResources.bind(this);

        this.state = {
            serverURL: '',
        }
    }

    handleChange(url){
        this.setState({
            serverURL: url.nativeEvent.text
        });
    }

    getResources(){
        let URL = `http://${this.state.serverURL}/api/data?ident=villages`;
        
        return fetch (URL)
            .then((data) => data.json())
                .then((res) => {this.setState({dataSource: res})}).catch((err) => {Alert.alert("Invalid URL. Check your URL!"); console.log(err);
                ;});
    }

    render() {
        return(
            <View style={StylesJS.main}>
                <Text style={StylesJS.header}>Api bot helper</Text>
                <TextInput style={StylesJS.searchInput} placeholder="http://" onChange={this.handleChange}/>

                <TouchableHighlight style={StylesJS.button}  onPress={serverList.addURL(this.state.serverURL)}>
                    <Text style={StylesJS.buttonText}>Add server</Text>
                </TouchableHighlight>
                <TouchableHighlight style={StylesJS.button}  onPress={this._retrieveData}>
                    <Text style={StylesJS.buttonText}>Retrieve server list</Text>
                </TouchableHighlight>

                <CustomFlatList itemList= {this.state.dataSource}/>
            </View>
        )
    }
}

class ServerList {
    serverURLs = [];

    addURL(url){
        this.serverURLs.push({
            urlMobx: url
        });
        console.log(this.serverURLs[0].urlMobx);
    }

    getAllUrls(){
        if(this.serverURLs.length === 0){
            return "<none>";
        }
        return `Server URLs: "${this.serverURLs[0].urlMobx}".`
    }
}

const serverList = new ServerList();