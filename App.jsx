import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theeprovider } from './src/Context/Themecontext'
import Mainapp from './Mainapp'

const App = () => {
  return (
<>
<Theeprovider>
  <Mainapp/>
</Theeprovider>
</>
  )
}

export default App

const styles = StyleSheet.create({})