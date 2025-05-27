import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getAuth  from '@react-native-firebase/auth'
const Splash = ({navigation}) => {


useEffect(()=>{
const checkuser=async()=>{

try {
    
const currentuser=getAuth().currentUser
console.log(currentuser)

const userData = await AsyncStorage.getItem('user');
setTimeout(()=>{
if(currentuser || userData){
    navigation.replace("Bottom")
}else{
    navigation.replace("Singup")

}


},3000)



} catch (error) {
console.log("cant find the account")
navigation.replace("Singup")
}




}
checkuser()
 

},[])


    return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#EC0C68"}}> 
<Image style={{height:250,width:250}} source={require("../assets/images.jpeg")} />
    <Text style={{color:"white",fontSize:26,fontStyle:"italic",fontWeight:700,marginBottom:30}}>
        TrackMate
    </Text>
    
<Text style={styles.linehab}>A Personal Habit Tracker

</Text>

    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    linehab:{
        position:"absolute",
        bottom:70,fontWeight:400,color:"white",fontSize:15
    }
})