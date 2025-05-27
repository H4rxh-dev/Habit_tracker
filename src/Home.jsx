import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themecontext } from './Context/Themecontext';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getHabitProgress } from './AsynHelper';

const Home = ({ navigation }) => {
  const [person, setperson] = useState("")
  const [Item, setItem] = useState([])
  const { currentheme } = useContext(Themecontext)

  const db = getFirestore()
  const currentUser = getAuth().currentUser;
  useEffect(() => {
    const userdetail = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData !== null) {
          const user = JSON.parse(userData)
          setperson(user.name)
          console.log("userssssssssssssss", user)
          console.log("detail=======>", detail)
        }

      } catch (error) {
        console.log("error hai")
      }
    }
    userdetail()

  }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        try {
          const storedHabits = await AsyncStorage.getItem("New");
          const habits = storedHabits ? JSON.parse(storedHabits) : [];

          setItem(habits);
          await loadProgressData(habits);
        } catch (error) {
          console.error('Error retrieving habits:', error);
        }
      };

      fetchHabits();
    }, [])
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProgressData();
    });

    return unsubscribe;
  }, [navigation]);
  const loadProgressData = async (habits) => {
    const today = new Date().toISOString().split('T')[0];
    const habitIds = habits.map(habit => habit.id);

    const allProgress = await Promise.all(
      habitIds.map(async (id) => {
        const progress = await getHabitProgress(id, today);
        return progress ?? 0;
      })
    );
    console.log("allrp")
    const updatedHabits = habits.map((habit, index) => ({
      ...habit,
      progress: allProgress[index]
    }));

    console.log("updatedprogress=========>", updatedHabits)

    setItem(updatedHabits); 
  };
  const rendering = ({ item, index }) => {

    return (
      <View style={{ backgroundColor: "transparent", height: 150, width: 140, margin: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Goaldata", {
          data: item
        })}>
          <AnimatedCircularProgress
            size={150}
            width={10}
            fill={item.progress}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          >
            {() => (
              <View style={{ padding: 10 }}>

                <Text style={{
                  fontSize: 15, fontWeight: 700, textAlign: "center",
                  color: currentheme === "dark" ? "white" : "black"

                }}>{item?.habit
                  .split("_")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                </Text>

                <Text style={{
                  fontSize: 10, textAlign: "center", marginTop: 3,
                  color: currentheme === "dark" ? "white" : "black"

                }}>{item.progress}%</Text>

              </View>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </View>
    )
  }
  console.log("Item=========>", Item)
  return (
    <SafeAreaView style={
      { flex: 1, backgroundColor: currentheme === "light" ? "#ECEBFC" : "#121212", padding: 25 }}>
        <View style={{ marginTop: 6 }}>
          <Text style={{
            fontSize: 15,
            fontWeight: "300",
            color: currentheme === "dark" ? "white" : "black"
          }}>
            Hello,
          </Text>
          <Text style={{
            fontSize: 30,
            fontWeight: "600",
            color: currentheme === "dark" ? "white" : "black"
          }}>
            {`${person} 👋`}
          </Text>
        </View>

      {Item.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={{ margin: 17, marginBottom: 10 }}><Text style={{
            fontSize: 27, fontWeight: 700,
            color: currentheme === "dark" ? "white" : "black"

          }}>Goals</Text></View>
          <FlatList
            data={Item}
            keyExtractor={(item) => item.id}
            renderItem={rendering}
            numColumns={2}
            columnWrapperStyle={styles.contain}
            showsVerticalScrollIndicator={false} // <---- add this prop to hide the scroll bar

          />

        </View>

      ) : (
        <View style={{ marginTop: 20, padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Myhabits")} style={{ marginTop: 20, backgroundColor: "black", padding: 15, borderRadius: 10 }}>
            <Text style={{
              textAlign: "center", fontWeight: "bold", color: currentheme === "dark" ? "white" : "black"

            }}>Create habit</Text>
          </TouchableOpacity>

          <Text style={{
            fontSize: 25, marginTop: 40, lineHeight: 40, color: 'gray', textAlign: 'center',
            color: currentheme === "dark" ? "white" : "black"

          }}>
            To generate goals {"\n"}for daily basis and {"\n"}track them effectively
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => {
        navigation.navigate("Myhabits")
      }} style={{
        position: 'absolute',
        bottom: 50, 
        right: 25,
        marginLeft: -30, 
        backgroundColor: currentheme == "dark" ? "white" : "black",
        width: 50,
        height: 50,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        zIndex: 5,

      }}>
        <Text style={{ color: currentheme == "dark" ? "black" : "white", fontSize: 30 }}>+</Text>
      </TouchableOpacity>

    </SafeAreaView>



  )
}

export default Home

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 50, 
    right: 25,
    marginLeft: -30, 
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 5, 
  }, contain: {
    justifyContent: "space-between"
  },


});
