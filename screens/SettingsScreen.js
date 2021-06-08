import React, { Component } from 'react';
import { View, StyleSheet, Text,TouchableOpacity,TextInput, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { AppTabNavigator } from '../components/AppTabNavigator';

export default class SettingsScreen extends Component{
  constructor(){
    super()
this.state = {

    firstName:'',
    lastName:'',
    address:'',
    contact:'',
    emailId:'',
    docId:''
}
}
getUserDetails= ()=>{
var email = firebase.auth().currentUser.email()
db.collection('users').where("email_id","==",email).get()
.then(snapshot => {
    snapshot.forEach(doc => {
    var data = doc.data()
      this.setState({
        emailId   : data.email_id,
        firstName : data.first_name,
        lastName  : data.last_name,
        address   : data.address,
        contact   : data.contact,
        docId     : doc.id
      })
    });
  })
}



componentDidMount(){
this.getUserDetails()


}
updateUserDetails = ()=>{
    db.collection('users').update({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        contact:this.state.contact,
        email_id:this.state.emailId,
        address:this.state.address
      })
Alert.alert("Profile Updated Successfully")
}
render(){
return(

    <View style = {styles.container}>
       <MyHeader title = {'Settings'} navigation = {this.props.navigation}> </MyHeader> 
    <View style = {styles.formContainer}>
    <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
      <TouchableOpacity
            style={styles.button}
            onPress={()=>
              this.updateUserDetails()
            }
          >
          <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

    </View>
     </View>


)


}}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   formContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  }

})
