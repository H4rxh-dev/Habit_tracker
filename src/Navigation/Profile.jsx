import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // ✅ Correct
import Mail from 'react-native-vector-icons/Entypo'; // ✅ Correct
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut } from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import Back from 'react-native-vector-icons/Ionicons'; // ✅ Correct
import { Themecontext } from '../Context/Themecontext';

const myIcon = <Icon name="arrow-right" size={12} color="gray" />;
const mail = <Mail name="mail" size={20} color="#100" />;
const back = <Back name="arrow-back" size={20} color="gray" />;

const Profile = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);


  const{currentheme,toggletheme}=useContext(Themecontext)


const handlelogout=async()=>{
try {
    await signOut(getAuth()); // Firebase sign out
    // await AsyncStorage.removeItem('user');
    setdetail("") // Clear stored user data
    navigation.replace('Login'); // Navigate back to Login screen
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

const version = DeviceInfo.getVersion(); // returns "1.0.0"


const[detail,setdetail]=useState(null)

useEffect(()=>{
const userdetail=async()=>{
try {
  
const userData = await AsyncStorage.getItem('user');

if(userData!==null){
  const user=JSON.parse(userData)
setdetail(user)
  console.log("userssssssssssssss",user)
  console.log("detail=======>",detail)
}

} catch (error) {
  console.log("error hai")
}
}
userdetail()
},[])

console.log(currentheme)
  return (
    <SafeAreaView style={{
                flex:1,backgroundColor:
                currentheme==="light"?"#ECEBFC":"#121212"
                , padding:28

    }}>
      <View style={{display:"flex",flexDirection:"row",alignItems:'center',gap:90}}>
        <Text style={{textAlign:"left",color:currentheme==="dark"?"white":"black",
      }} onPress={()=>{
          navigation.replace("Bottom")
        }} >{back}</Text>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:600,
        color:currentheme==="dark"?"white":"black"
        }}>Profile</Text>
      </View>
   
<Image
source={require("../../assets/crop.jpeg")}
 style={{borderRadius:100,height:140,width:140,marginLeft:95,marginTop:20}}
 
 />

<View>

<Text style={{textAlign:"center",
          color:currentheme==="dark"?"white":"black",

  marginTop:15,fontSize:25,fontWeight:600}}>
{detail?.name ||"username"}

</Text>

<Text style={{textAlign:"center",fontSize:16,fontWeight:200,
          color:currentheme==="dark"?"white":"black",

}}>
{detail?.email ||"email"}

</Text>

<View style={{marginTop:10,display:"flex",justifyContent:"center", gap:20,padding:10}}>
<View style={{borderColor:"gray",borderWidth:1.2,padding:16,borderRadius:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>


<View style={{flexDirection:"row",gap:6}}>
  <Text
  style={{
          color:currentheme==="dark"?"white":"black",
    
  }}
  >Habit</Text>
  </View>  
<Text
style={{
          color:currentheme==="dark"?"white":"black",

}}
>{myIcon}</Text>
</View>
<View style={{borderColor:"gray",borderWidth:1.2,padding:16,borderRadius:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>

<View style={{flexDirection:"row",gap:6}}>
  <Text style={{
          color:currentheme==="dark"?"white":"black",

  }}>{`${currentheme.toUpperCase()} MODE`}</Text>
  </View>  
<Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={currentheme? '#f5dd4b' : '#f4f3f4'}
        onValueChange={()=>toggletheme(currentheme==="light"?"dark":"light")}
        value={currentheme==="dark" }
      />


</View>




</View>



<TouchableOpacity onPress={()=>{
  handlelogout()
}} style={{backgroundColor:"#EC0C68",padding:20,width:"60%",marginHorizontal:65,marginVertical:40,borderRadius:10}}>
<Text style={{color:"white",textAlign:"center",fontSize:15}}>Log out</Text>
</TouchableOpacity>

   </View>
   
   
<Text style={{color:"black",fontSize:10,textAlign:"center",
          color:currentheme==="dark"?"white":"black",
marginTop:20

}}>App Version {version}</Text>
   
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({

})