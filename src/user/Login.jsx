import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const[email,setemail]=useState("")
  const[pass,setpass]=useState("")
const[loading,setLoading]=useState(false)
const[err,seterr]=useState("")



  const onlogin=async()=>{
     setLoading(true);

    try {
       const userCredential = await getAuth().signInWithEmailAndPassword(email, pass);
      const user = userCredential.user;
console.log(user)
const existingData = await AsyncStorage.getItem('user');
      let oldUserData = existingData ? JSON.parse(existingData) : {};

      // ✅ Merge & Save Updated User Info
      const updatedUser = {
        ...oldUserData,
        email: user.email,
        uid: user.uid,
      };

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      console.log('User Logged In:', updatedUser);

      console.log('User logged in:', user.email);
      navigation.replace('Bottom'); //




    } catch (error) {
      seterr(`Please enter correct email and password`);
      
      //  Alert.alert('Lin Failedog', error);
    }
setLoading(false)
  }

  



  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}></Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="gray"
        onChangeText={(text)=>setemail(text)}
        // virat@77
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="gray"
          secureTextEntry
        onChangeText={(text)=>setpass(text)}

        />
        <TouchableOpacity 
        onPress={()=>{
         onlogin() 
        }}
        
        style={styles.button}>
          <Text style={styles.buttonText}>
         {loading?(
   <ActivityIndicator/>
):(
"Login"
         )}

          </Text>
        </TouchableOpacity>
 {err!== '' && (
   <Text style={{ color: 'red', marginTop: 10 }}>{err}</Text>
 )}
 
      </View>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
  <Text style={{ color: 'gray' }}>or Create new account </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Singup")}>
    <Text style={{ color: '#4da6ff', fontWeight: '600' }}>Sign up</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginTop: 90,
    fontSize: 36,
    fontWeight: '700',
    color: 'blue',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    marginTop: 15,
  },
  inputWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 22,
    gap: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 0.5,
    height: 60,
    width: '95%',
    paddingHorizontal: 20,
    color:"black"
  },
  button: {
    backgroundColor: 'blue',
    padding: 13,
    borderRadius: 10,
    height: 60,
    width: '95%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
});
