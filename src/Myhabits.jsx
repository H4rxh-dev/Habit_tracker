import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Themecontext } from './Context/Themecontext'
import DropDownPicker from 'react-native-dropdown-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "react-native-uuid"
import Icon from 'react-native-vector-icons/Ionicons';
import {habititem } from './Drop';
import { useFocusEffect } from '@react-navigation/native';
import { habitDetailsOptions } from './Reusable';


const Myhabits = ({ navigation }) => {
  const { currentheme } = useContext(Themecontext)
  const [items, setItems] = useState(habititem);
  const [progress, setprogress] = useState(0)
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailValue, setDetailValue] = useState(null);
  const [detailValueTarget, setDetailValueTarget] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [All, setAll] = useState([])
  const [completed, setcompleted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [date, setDate] = useState(new Date());


  const uniqueid = uuid.v4()

  const handleCreateHabit = async () => {
    setModalVisible(true)
  }

  const filteredItems = habititem.filter(
    habit => !All.some(selected => selected.habit === habit.value)
  );

  console.log(filteredItems)

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        try {
          const storedHabits = await AsyncStorage.getItem("New");
          const habits = storedHabits ? JSON.parse(storedHabits) : [];
          setAll(habits);

          await AsyncStorage.setItem("New", JSON.stringify(habits))

        } catch (error) {
          console.error('Error retrieving habits:', error);
        }
      };

      fetchHabits();
    }, [])
  );
  useEffect(() => {
    const usingdoc = async () => {
      try {

        const userdata = await AsyncStorage.getItem('New');

        if (userdata !== null) {
          const user = JSON.parse(userdata)
          setAll(user)
          console.log("userssssssssssssss", user)
          console.log("detail=======>", detail)
        }
      } catch (error) {
        console.log("error hai")
      }
    }

    usingdoc()
  }, [])
  const handel = async (id) => {
    try {

      const storedHabits = await AsyncStorage.getItem("New");
      const habits = storedHabits ? JSON.parse(storedHabits) : [];

      const data = habits.filter(habitdata => habitdata.id !== id)
      await AsyncStorage.setItem("New", JSON.stringify(data))
      setAll(data);

    } catch (error) {
      console.log("not coreecet id", error)
    }

  }

  const modailclose = async () => {
    setModalVisible(false)
    if (!title || !value) {
      return
    }
    try {
      let data = {
        id: uniqueid,
        title: title,
        habit: value,
        detail: detailValue,
        target: detailValueTarget,
        description: desc,
        completed: completed,
        createdAt: new Date().toISOString().slice(0, 10),
        progress: progress
      };
      const updated = [...All, data]
      setAll(updated)
      console.log("newdata=====>", data)
      await AsyncStorage.setItem("New", JSON.stringify(updated));
      console.log("newdata===>")
      console.log("All======>", All)
      // Reset fields after submission
      settitle('');
      setValue(null);
      setDetailValue(null);
      setDetailValueTarget(null)
      setdesc('');
      setOpen(false);
      setDetailOpen(false);
    } catch (error) {
      console.log("Are ho gaya nhi baaki hai")
    }
  }
  const render = ({ item }) => {
    const dateOnly = item.createdAt.split('T')[0];
    const [year, month, day] = dateOnly.split('-');
    const reversedDate = `${day}-${month}-${year}`;
    const deletebtn = <Icon name="trash" size={18} color="#100" />;

    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Updatehab", {
              isdesc: item.description,
              isdetail: item.detail,
              isid: item.id,
              ishabit: item.habit,
              istitle: item.title,
              iscreatedAt: item.createdAt

            })
          }}
        >

          <View style={{ backgroundColor: "white", marginTop: 25, borderRadius: 13, borderWidth: 0.2, padding: 20, gap: 15, position: "relative" }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ padding: 4 }}>
                <Text style={{ fontSize: 20, fontWeight: 500 }}>
                  {item.title.length > 6 ? item.title.substring(0, 6) + "..." : item.title}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 13 }}>
            {item?.habit
              .split("_")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
                </Text>
                <Text>
                  {item.detail}
                </Text>
              </View>

              <View style={{ justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => handel(item.id)}>

                  <Text style={{ textAlign: "right", padding: 10 }}>{deletebtn}</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 30, color: "gray" }}>
                  {readableDate(new Date(item.createdAt))}
                </Text>

              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )

  }
  useEffect(() => {
    // Whenever the habit value changes, clear the detail
    setDetailValue(null);
    setDetailValueTarget(null);
    setDetailOpen(false); // Optional: close the second dropdown
  }, [value]);

  const generateWeekDates = (referenceDate = new Date()) => {
    const dayOfWeek = referenceDate.getDay();        // 0 = Sunday … 6 = Saturday
    const startOfWeek = new Date(referenceDate);     // clone
    startOfWeek.setDate(referenceDate.getDate() - dayOfWeek);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const readableDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Mon, Tue, Wed...
      day: "numeric",   // 1, 2, 3...
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentheme === "light" ? "#ECEBFC" : "#121212", padding: 40, justifyContent: "space-between" }}>
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'rgba(20, 20, 20, 0.5)', padding: 30, justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, gap: 25 }}>
              <TextInput placeholder="Title" placeholderTextColor={"black"} value={title} onChangeText={settitle} style={styles.input} />
              <DropDownPicker
                open={open} value={value} items={filteredItems}
                setOpen={setOpen} setValue={setValue} setItems={setItems}
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
                    onChangeValue={(val) => {
                      setDetailValue(val);
                      const index = habitDetailsOptions[value].indexOf(val);
                      console.log("TAGGGGGGGGGGGG>>>>>>>> "+index)
                      setDetailValueTarget(index);
                    }}
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
                onChangeText={setdesc}
                multiline
                placeholderTextColor={"black"}
                style={[styles.input, { height: 80 }]}
              />

              <TouchableOpacity onPress={modailclose} style={{ marginTop: 20, backgroundColor: "black", padding: 15, borderRadius: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Save Habit</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      <View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={All}
          keyExtractor={(items) => items.id}
          renderItem={render}
          showsVerticalScrollIndicator={false} // <---- add this prop to hide the scroll bar
        />

      </View>
      {modalVisible ? (
        "") : (


        <TouchableOpacity
          onPress={handleCreateHabit}
          style={{ backgroundColor: currentheme == "dark" ? "#ECEBFC" : "black", padding: 10, borderRadius: 10 }} >
          <Text style={{ color: currentheme === "dark" ? "black" : "white", fontWeight: '600', textAlign: "center", }}>Create Habit</Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  )
}
export default Myhabits
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: "black",
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  }
})