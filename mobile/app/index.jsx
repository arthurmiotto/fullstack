import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import telalogin from './login/telalogin';
import telaregistro from './registro/telaregistro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent= {true}>
      <Stack.Navigator initialRouteName="telalogin" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="telalogin" component={telalogin} />
        <Stack.Screen name="telaregistro" component={telaregistro} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
