import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';



const Signup = ({navigation}) => {
const db=getFirestore()

  const[name,setname]=useState("")
  const[email,setemail]=useState("")
  const[pass,setpass]=useState("")
const[loading,setLoading]=useState(false)
const[err,seterr]=useState("")

const createuser = async () => {
     setLoading(true);
   
  
  try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, pass);
      const user = userCredential.user;
console.log(user._user)
      // Set user data in Firestore using correct React Native Firebase method
      await db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: user.email,
        // pass:user.pass
      });

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          name,
          email,
          pass,
          uid: user.uid,
          userdata:user._user

        })
      );

      console.log("User created & saved successfully");
      navigation.navigate('Bottom');

    } 
catch (error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      seterr  ('This email is already in use.');
      break;
    case 'auth/invalid-email':
      seterr('Please enter a valid email address.');
      break;
    case 'auth/weak-password':
      seterr('Password should be at least 6 characters.');
      break;
    default:
      seterr(error.message); // fallback
  }
}
        setLoading(false);

  };  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>Create your new account</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="gray"
onChangeText={(text)=>setname(text)}
/>

        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="gray"
onChangeText={(text)=>setemail(text)}

/>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="gray"
          secureTextEntry
onChangeText={(text)=>setpass(text)}

        />

        <TouchableOpacity onPress={()=>{
          console.log("user",name)
          createuser()
        }} style={styles.button}>
          <Text style={styles.buttonText}> 
{loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Sign up</Text>
      )}

            </Text>
        </TouchableOpacity>
{err!== '' && (
  <Text style={{ color: 'red', marginTop: 10 }}>{err}</Text>
)}

      </View>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
  <Text style={{ color: 'gray' }}>Already have account,please </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={{ color: '#4da6ff', fontWeight: '600' }}>Login</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

export default Signup;

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
