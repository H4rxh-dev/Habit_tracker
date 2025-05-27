import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themecontext } from './Context/Themecontext';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { getHabitProgress } from './AsynHelper';

const Home = ({ navigation }) => {
  const [person, setperson] = useState("")
  const [Item, setItem] = useState([])
  const { currentheme } = useContext(Themecontext)
 const [modalVisible, setModalVisible] = useState(false);
   const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'

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

        setItem(habits); // update state for UI
        await loadProgressData(habits); // pass directly to avoid race condition
      } catch (error) {
        console.error('Error retrieving habits:', error);
      }
    };

    fetchHabits();
  }, [])
);



  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     loadProgressData(); // same: load and update FlatList data
  //   }
  // }, [isFocused, Item]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProgressData(); // Reload progress each time the screen is focused
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
  // Map the progress back to the habits and update state
  const updatedHabits = habits.map((habit, index) => ({
    ...habit,
    progress: allProgress[index]
  }));  

  console.log("updatedprogress=========>",updatedHabits)

  setItem(updatedHabits); // now updates with correct progress
};



 const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);


  const sorted=(order)=>{
    const sorted = [...Item].sort((a, b) => {
      if (order === 'asc') return a.title.localeCompare(b.title);
      else return b.title.localeCompare(a.title);
    });
    setItem(sorted);
    setSortOrder(order);
    closeModal();
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
              <View style={{padding:10}}>

                {/* <Text style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: '#333',
                  textAlign: 'center',
                          color: currentheme === "dark" ? "white" : "black"

                }}>
                  {item.title}

                </Text> */}
                <Text style={{ fontSize: 15,fontWeight:700, textAlign: "center",
                            color: currentheme === "dark" ? "white" : "black"

                 }}>{item?.habit
                  .split("_")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                </Text>

                <Text style={{ fontSize: 10, textAlign: "center",marginTop:3,
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

<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>

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

<TouchableOpacity onPress={openModal}>
  <Text style={{
            color: currentheme === "dark" ? "white" : "black" }} >Sort</Text>
</TouchableOpacity>
</View>

      {Item.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={{ margin: 17, marginBottom: 10 }}><Text style={{ fontSize: 27, fontWeight: 700,
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
            <Text style={{ textAlign: "center",  fontWeight: "bold",color: currentheme === "dark" ? "white" : "black"

             }}>Create habit</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 25, marginTop: 40, lineHeight: 40, color: 'gray', textAlign: 'center',
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
        bottom: 50, // adjust to hover above tab bar
        right: 25,
        marginLeft: -30, // half of width
        backgroundColor: currentheme == "dark" ? "white" : "black",
        width: 50,
        height: 50,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        zIndex: 5, // ensure it appears above tab bar

      }}>
        <Text style={{ color: currentheme == "dark" ? "black" : "white", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >

 <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 20, marginBottom: 20,
                        color: currentheme === "dark" ? "white" : "black"

             }}>Sort By Title</Text>
            <TouchableOpacity onPress={() => sorted('asc')} style={styles.optionBtn}>
              <Text 
              style={{          color: currentheme === "dark" ? "white" : "black"
}}
              >Ascending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sorted('desc')} style={styles.optionBtn}>
              <Text style={{          color: currentheme === "dark" ? "white" : "black"
}}>Descending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={[styles.optionBtn, { backgroundColor: '#ddd' }]}>
              <Text style={{          color: currentheme === "dark" ? "white" : "black"
}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>



  )
}

export default Home

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 50, // adjust to hover above tab bar
    right: 25,
    marginLeft: -30, // half of width
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 5, // ensure it appears above tab bar
  }, contain: {
    justifyContent: "space-between"
  },
  modalOverlay: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    width: '80%'
  },
  optionBtn: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  }


});
