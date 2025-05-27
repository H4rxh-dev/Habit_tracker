import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { habititem } from './Drop'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { habitDetailsOptions } from './Reusable'
const Updatehab = ({route}) => {
console.log("route===========>",route.params)
const{isid,isdesc,isdetail,ishabit,istitle,iscreatedAt}=route.params || {}
const editingId = isid || null;
  const editingTitle = istitle || "";
  const editingDesc = isdesc || "";
  const editingDate = iscreatedAt || new Date().toISOString();;
const edithabit=ishabit || ""
const editdetail=isdetail || ""
const navigation=useNavigation()
    const[title,settitle]=useState(editingTitle || "")
            const [items, setItems] = useState(habititem);
    const[desc,setdesc]=useState(editingDesc ||   "")
const [open, setOpen] = useState(false);
  const [value, setValue] = useState(edithabit  ||     null);
  const [loading, setLoading] = useState(false);
const [detailValue, setDetailValue] = useState(editdetail   || null);
  const [detailOpen, setDetailOpen] = useState(false);
const[All,setAll]=useState([])
const[createdAt,setcreatedAt]=useState(editingDate || new Date().toISOString())

const[completed,setcompleted]=useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState([]);

console.log("route====>",route.params)
const habitupdate=async()=>{
    try {
    const storedHabits = await AsyncStorage.getItem("New");
    const habits = storedHabits ? JSON.parse(storedHabits) : [];
    console.log("habits==========>",habits)
if(editingId){

const updatedhabits=habits.map(hab=>{
    if(hab.id==editingId){
return{
       ...hab,
       id:editingId,
       title:title,desc:desc,habit:value,detail:detailValue,createdAt:createdAt
    }
    }
    return hab
})
await AsyncStorage.setItem("New",JSON.stringify(updatedhabits))


console.log("upatedHabits====>",updatedhabits)

}
navigation.goBack()
} catch (error) {   
console.log("error",error)
}
}
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white", padding: 30, justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10,gap:25 }}>
              <TextInput placeholder="Title" placeholderTextColor={"black"} value={title} onChangeText={(text)=>settitle(text)} style={styles.input} />
              <DropDownPicker
                open={open} value={value} items={items}
                    placeholder="Select Habit" style={{ marginBottom: open ? 100 : 10 }}
              />
              {value && (
                habitDetailsOptions[value] ? (
                  <DropDownPicker
                    open={detailOpen}
                    value={detailValue}
                    items={habitDetailsOptions[value].map(opt => ({ label: opt, value: opt }))}
                    setOpen={setDetailOpen}
                    setValue={setDetailValue}
                    placeholder="Select Detail"
                    style={{ marginBottom: detailOpen ? 100 : 10 }}
                    zIndex={3000}
  zIndexInverse={1000}
                  />
                ) : (
                  <TextInput
    
                    placeholder="Enter Detail"
                    value={detailValue || ''}
                    onChangeText={setDetailValue}
                    keyboardType="numeric"
                    style={styles.input}
                  
                  />
                )
              )}
              <TextInput
                placeholder="Description"
                value={desc}
                onChangeText={(text)=>setdesc(text)}
                multiline
                placeholderTextColor={"black"}
                style={[styles.input, { height: 80 }]}
              />
              <TouchableOpacity  onPress={habitupdate} style={{ marginTop: 20, backgroundColor: "black", padding: 15, borderRadius: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Update Habit</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

)
}

export default Updatehab

const styles = StyleSheet.create({
     input: {
    backgroundColor: "white",
    color: "black",
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 30
  }
})