import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { habititem} from '../Drop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { calculateProgress, saveHabitProgress } from '../AsynHelper';
import { habitDetailsOptions } from '../Reusable';


const Goaldata = ({ route }) => {
  const { data } = route.params
  const navigation = useNavigation()
  const [goal, setGoal] = useState(data);
  const [progress, setProgress] = useState(data.progress || 0);
  console.log("pro=======================>", progress)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.habit || null);
  const [loading, setLoading] = useState(false);
  const [detailValue, setDetailValue] = useState(data?.detail || null);
  const [detailValueTarget, setDetailValueTarget] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [items, setItems] = useState(habititem);
  const editingId = data?.id || null;

//   const limitedOptions = React.useMemo(() => {
//   if (value && detailValueTarget !== null && habitDetailsOptions[value]) {
//     return habitDetailsOptions[value].slice(0, detailValueTarget + 1);
//   }
//   return habitDetailsOptions[value] || [];

useEffect(() => {
  if (data?.detail && value && habitDetailsOptions[value]) {
    const index = habitDetailsOptions[value].indexOf(data.detail);
    if (index !== -1) {
      setDetailValueTarget(index + 1);
    }
  }
}, [value, data?.detail]);



// }, [value, detailValueTarget]);
const limitedOptions = useMemo(() => {
  if (value && detailValueTarget !== null && habitDetailsOptions[value]) {
    return habitDetailsOptions[value].slice(0, detailValueTarget);
  }
  return habitDetailsOptions[value] || [];
}, [value, detailValueTarget]);



  console.log("editingid=======>", editingId)
  const habitupdate = async () => {
    try {
      const target = Number(data.target)
      const id = data.id
console.log("target=========>",target)

// percentage = ((detailValueTarget + 1) / target) * 100

// selected items count = detailValueTarget + 1 (because index start from 0)
    // const selectedCount = (detailValueTarget ?? 0) + 1;

    // let percentage = (selectedCount / target) * 100;
    // percentage = Math.round(percentage);

    const percentage = calculateProgress(detailValue, value, habitDetailsOptions);
    console.log("Progress Percentage:", percentage);

    

      const today = new Date().toISOString().split('T')[0];
     await saveHabitProgress(id,today,percentage)
      navigation.navigate("Bottom")
    } catch (error) {
      console.log("error", error)
    }
  }
  console.log("route===============>", route.params)
  // const limitedOptions = habitDetailsOptions[value]?.slice(0, detailValueTarget + 1) || [];
  // const limitedOptions = habitDetailsOptions[value]?.slice(0, detailValueTarget + 1) || [];

  console.log("limietdoptions========>",limitedOptions)
  return (
    <View style={{ flex: 1 , padding: 30, justifyContent: "space-between", marginBottom: 40 }}>
      <View>

        <Text>Goal</Text>

      </View>
      <View style={{ marginTop: 60, backgroundColor: "white", padding: 30, borderColor: "gray", borderRadius: 20, borderWidth: 0.5 }}>
        <Text style={{ textAlign: "center", fontSize: 34, }}>{data.title}</Text>
        <View style={{ gap: 20 }}>
          <Text style={{ marginTop: 20 }}>Your todays goals is achieved:</Text>

          <Text style={{ textAlign: "center" }}>
            {data?.habit
              .split("_")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Text>

          <DropDownPicker
            open={detailOpen}
            value={detailValue}
            items={limitedOptions.map(opt => ({ label: opt, value: opt }))}
            setOpen={setDetailOpen}
            setValue={setDetailValue}
onChangeValue={(val) => {
  setDetailValue(val);
  const index = habitDetailsOptions[value]?.indexOf(val);
  if (index !== -1 && index !== undefined) {
    setDetailValueTarget(index + 1); // ➕ we want to include this item
    console.log("TAGGG>>setDetailValueTarget", index + 1);
  } else {
    console.warn("Value not found in habit options:", val);
  }
}}
            placeholder="Select Detail"
            style={{ marginBottom: detailOpen ? 60 : 10 }}
            zIndex={3000}
            zIndexInverse={1000}
          />

        </View>
        <View style={{ padding: 30 }}>

          <TouchableOpacity onPress={habitupdate} style={{ backgroundColor: "black", padding: 15, borderRadius: 10 }}>
            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Add goals</Text>
          </TouchableOpacity>


        </View>
      </View>
    </View>
  )
}

export default Goaldata

const styles = StyleSheet.create({})