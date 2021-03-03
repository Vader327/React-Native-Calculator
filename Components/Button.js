import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class Button extends React.Component {
  render(){
    return (
        <TouchableHighlight style={[styles.topButton, this.props.style]} underlayColor={this.props.underColor} onPress={this.props.onPress} >
            <Text style={[styles.topButtonText, this.props.textStyle]}>{this.props.text}</Text>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  topButton:{
    backgroundColor: '#303030',
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    margin: 5,
  },
  topButtonText:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  }
});
