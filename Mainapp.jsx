import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './src/Splash'
import Info from './src/Info'
import Bottom from './src/Navigation/Bottom'
import Singup from './src/user/Singup'
import Login from './src/user/Login'
import Profile from './src/Navigation/Profile'
import { Themecontext } from './src/Context/Themecontext'
import Myhabits from './src/Myhabits'
import Updatehab from './src/Updatehab'
import Goaldata from './src/user/Goaldata'



const Stack=createNativeStackNavigator()

const Mainapp = () => {
    const{currentheme}=useContext(Themecontext)
  
  return (
    <NavigationContainer>
<StatusBar
        backgroundColor="#ec1f71"
        barStyle={currentheme=="dark"?"light-content":'dark-content'}
        translucent={false}
      />     

<Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Singup" component={Singup} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Bottom" component={Bottom} />

      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Myhabits" component={Myhabits} />
      <Stack.Screen name="Updatehab" component={Updatehab} />
      <Stack.Screen name="Goaldata" component={Goaldata} />

    </Stack.Navigator>
    </NavigationContainer>
 

  )
}

export default Mainapp

const styles = StyleSheet.create({})