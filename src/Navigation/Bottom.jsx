import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home'
import Profile from './Profile'
import Icon from 'react-native-vector-icons/Ionicons';
import { Themecontext } from '../Context/Themecontext'
import Myhabits from '../Myhabits'


const Tab=createBottomTabNavigator()

const Bottom = () => {
  const{currentheme}=useContext(Themecontext)

  return (



<Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle:{
            backgroundColor:currentheme=="dark"?"#121212":"#ECEBFC",
            borderTopWidth:0,
            shadowColor:"transparent"
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Goal') {
              iconName = focused ? 'trophy' : 'trophy-outline';
          }else if (route.name === 'Myhabits') {
              iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          }else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
          } 

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor:currentheme==="dark"?"white": 'black',
          tabBarInactiveTintColor:currentheme=="dark"?"white" :'gray',
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={0.5} /> // 👈 Less opacity when pressed
          ),
            })}
        >







    <Tab.Screen name="Goal" component={Home} />
    <Tab.Screen name="Myhabits" component={Myhabits} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>    )
}

export default Bottom

const styles = StyleSheet.create({})







// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import Icon from "react-native-vector-icons/Ionicons"
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Profile from '../screen/Profile'
// import Home from '../screen/Home'

// let Tab=createBottomTabNavigator()

// const TabNaviagtion = () => {
//   return (
// <>

// <Tab.Screen name='Home' component={Home}  />
// <Tab.Screen name='Profile' component={Profile}  />

// </Tab.Navigator>
// </>

//   )
// }

// export default TabNaviagtion

// const styles = StyleSheet.create({})