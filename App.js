import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Button from './Components/Button';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      equation: "",
      active: "",
      finalE: "",
    }
  }

  appendNumber=(number)=>{
    if(this.state.equation.length < 10 && !(this.state.equation == '' && number == 0)){
      var new_equation = this.state.equation + number.toString();
      var new_final_equation = this.state.finalE + number.toString();

      this.setState({finalE: new_final_equation, equation: new_equation}, ()=>{
        console.log(this.state.finalE);

        /*if(number != 0 && isNaN(this.state.finalE.slice(-1)) && this.state.equation == '0'){
          this.setState({equation: number.toString()});
        }*/

        if(isNaN(this.state.finalE.charAt(this.state.finalE.length - 2))){
          console.log('hi');
          if(number != 0 && isNaN(this.state.finalE.slice(-1)) && this.state.equation == '0'){
            this.setState({equation: number.toString()});
          }
          this.setState({equation: this.state.finalE.charAt(this.state.finalE.length - 1)});
        }
      })

      if(this.state.active !== ""){
        this.setState({active: ""})
      }
    }
  }

  appendSign=(signWord, sign)=>{
    var final_eq = this.state.finalE + sign;
    this.setState({active: signWord, finalE: final_eq}, ()=>{
      console.log(this.state.finalE);

      //try{
        //var equation_without_zero = parseInt(this.state.equation.toString(), 8);
      //}
        //this.setState({equation: equation_without_zero})

      if(isNaN(this.state.finalE.charAt(this.state.finalE.length - 2))){
        this.setState({finalE: this.state.finalE.slice(0,-2) + this.state.finalE.charAt(this.state.finalE.length - 1)});
      }
    })
  }

  evaluate=()=>{
    if(isNaN(this.state.finalE.charAt(0))){
      this.setState({finalE: this.state.finalE.substring(1)})
    }
    var final = eval(this.state.finalE);

    if(final.toString().length > 7){
      final = final.toExponential(2);
    }
    this.setState({equation: final})
  }

  render(){
    return (
      <View style={{backgroundColor:'black', height: '100%'}}>
        <GestureRecognizer
        onSwipeRight={()=>{this.setState({
          equation: this.state.equation.slice(0, -1),
          finalE: this.state.finalE.slice(0, -1)
          })}}>
          <Text style={styles.mainText}>{this.state.equation !== "" ? this.state.equation : "0"}</Text>
        </GestureRecognizer>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', bottom: 10,}}>
          <Button text="C" onPress={()=>{this.setState({equation: "", active:"", finalE: ""})}} underColor="lightgray" style={{backgroundColor: 'gray'}} />
          <Button text="+/-" onPress={()=>{}} underColor="lightgray" style={{backgroundColor: 'gray'}} />
          <Button text="%" onPress={()=>{}} underColor="lightgray" style={{backgroundColor: 'gray'}}  />

          <Button text="÷" onPress={()=>{this.appendSign("divide","/")}}
          style={this.state.active=="divide" ? {backgroundColor: 'white'} : {backgroundColor: 'orange'}}
          textStyle={this.state.active=="divide" ? {color: 'orange'} : {color: 'white'}} underColor="#ffc252" />

          <Button text="7" onPress={()=>{this.appendNumber(7)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="8" onPress={()=>{this.appendNumber(8)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="9" onPress={()=>{this.appendNumber(9)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          
          <Button text="✕" onPress={()=>{this.appendSign("multiply","*")}}
          style={this.state.active=="multiply" ? {backgroundColor: 'white',} : {backgroundColor: 'orange',}}
          textStyle={this.state.active=="multiply" ? {color: 'orange',marginTop:5} : {color: 'white',marginTop:5}} underColor="#ffc252" />

          <Button text="4" onPress={()=>{this.appendNumber(4)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="5" onPress={()=>{this.appendNumber(5)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="6" onPress={()=>{this.appendNumber(6)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />

          <Button text="-" onPress={()=>{this.appendSign("subtract","-")}}
          style={this.state.active=="subtract" ? {backgroundColor: 'white'} : {backgroundColor: 'orange'}}
          textStyle={this.state.active=="subtract" ? {color: 'orange',fontSize:50,fontWeight:'300',marginBottom:5} : {color: 'white',fontSize:50,fontWeight:'300',marginBottom:5}} underColor="#ffc252" />

          <Button text="1" onPress={()=>{this.appendNumber(1)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="2" onPress={()=>{this.appendNumber(2)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="3" onPress={()=>{this.appendNumber(3)}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />

          <Button text="+" onPress={()=>{this.appendSign("add","+")}}
          style={this.state.active=="add" ? {backgroundColor: 'white'} : {backgroundColor: 'orange'}}
          textStyle={this.state.active=="add" ? {color: 'orange',fontSize:50,fontWeight:'300',marginBottom:5} : {color: 'white',fontSize:50,fontWeight:'300',marginBottom:5}} underColor="#ffc252" />

          <Button text="0" onPress={()=>{this.appendNumber(0)}} style={{width: 150, paddingLeft: 27,}} underColor="#4b4b4b" textStyle={{color: 'white', textAlign: 'left'}}  />
          <Button text="." onPress={()=>{}} underColor="#4b4b4b" textStyle={{color: 'white'}}  />
          <Button text="=" onPress={this.evaluate} style={{backgroundColor: 'orange'}} textStyle={{color: 'white'}} underColor="#ffc252" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainText:{
    marginTop: 60,
    color: 'white',
    textAlign: 'right',
    fontSize: 80,
    paddingRight: 20,
    fontWeight: '300',
  }
});
