import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Themecontext } from './Context/Themecontext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from "react-native-uuid"
import { getAuth } from '@react-native-firebase/auth'
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from '@react-native-firebase/firestore'

const Info = ({route}) => {
const uniqueid=uuid.v4()
const db=getFirestore()

const{istitle,isdesc,iscreatedAt,isId}=route.params || {}
console.log(route.params)
  const{currentheme}=useContext(Themecontext)

const editingId = isId || null;
  const editingTitle = istitle || "";
  const editingDesc = isdesc || "";
  const editingDate = iscreatedAt || new Date().toISOString();;

const[title,settitle]=useState(editingTitle||"")
const[desc,setdesc]=useState(editingDesc ||"")
const[createdAt,setcreatedAt]=useState(editingDate || new Date().toISOString())
const[completed,setcompleted]=useState(false)





const navigation=useNavigation()


// console.log("navigation=====>",navigation)

console.log("route====>",route)






const handleSave = async()=>{
  if (!title || !desc) {
    Alert.alert("Title and description are required");
    return;
  }
    const currentUser = getAuth().currentUser;
console.log("userrssssssssssssssssssssssssssssssssssssssssssss=>",currentUser.uid)
if(!currentUser) return console.log("warning please sign up")
      const userRef = doc(db, 'users', currentUser.uid);  // Firestore user reference

  try {
    const storedHabits = await AsyncStorage.getItem("Habits");
    const habits = storedHabits ? JSON.parse(storedHabits) : [];

    if(editingId){

      
 const habitRef = doc(db, 'users', currentUser.uid, 'habits', editingId);
      await updateDoc(habitRef, {
      id:editingId,
        title:title,
        desc:desc,
        createdAt:createdAt,
        completed:completed,
              }); console.log('✅ Note updated!');




console.log("habits====>",habits)
const updatedHabits = habits.map(habit => {
        if (habit.id === editingId) {
         return {
            ...habit,
            title,
            desc,
            completed,
            createdAt,
          };
        }
 return habit;
      });        
    await AsyncStorage.setItem("Habits", JSON.stringify(updatedHabits))

    }else{
console.log("habits====>",habits)

const habitRef = doc(db, 'users', currentUser.uid, 'habits', uniqueid);
 await setDoc(habitRef, {
          id:uniqueid,

  title: title,
          desc: desc,
          createdAt: createdAt,
completed:completed
        });


  const newHabit = {
    id:uniqueid,
    title,
    desc,
  completed,
    createdAt,
  };




    habits.push(newHabit);

    await AsyncStorage.setItem("Habits", JSON.stringify(habits));



    }


navigation.goBack("Bottom")
  } catch (error) {
    console.error("Error saving habit:", error);
    Alert.alert("Failed to save habit.");
  }
};











  return (
    <SafeAreaView  style={{ flex:1, backgroundColor:currentheme==="light"?"#ECEBFC":"#121212",padding:30,gap:20}}>
<TextInput style={{backgroundColor:"white",color:"black",borderColor:"black",borderWidth:0.5,paddingStart:20,borderRadius:8}} 
value={title}
onChangeText={(text)=>settitle(text)}
placeholder='Title'


placeholderTextColor={"black"}  />

<TextInput  multiline  style={{backgroundColor:"white",color:"black",borderColor:"black",borderWidth:0.5,paddingVertical:20,borderRadius:8,paddingHorizontal:20}} 
value={desc}
onChangeText={(text)=>setdesc(text)}

placeholder='description' placeholderTextColor={"black"}  />

  <TouchableOpacity onPress={handleSave} style={{backgroundColor:currentheme=="dark"?"#ECEBFC":"black",padding:12,borderRadius:10}} >
    <Text style={{ color: currentheme==="dark"?"black":"white", fontWeight: '600' ,textAlign:"center",}}>Submit</Text>
  </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Info

