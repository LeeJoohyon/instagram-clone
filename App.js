import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './Components/MainScreen';

const AppStackNavigator = createStackNavigator({
  Main:{
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  }
});

export default createAppContainer(AppStackNavigator);

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
