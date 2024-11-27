import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import telalogin from './login/telalogin';
import telaregistro from './registro/telaregistro';
import telasucesso from './sucesso/telasucesso';
import telaconfig from './config/telaconfig';
import editarperfil from './editarPerfil/editarperfil';
import TelaSobre from './sobre/telasobre';
import telahome from './home/telahome';
import Sertanejo from './sertanejo/sertanejo';
import funk from './funk/funk';
import top from './top/top';
import eletronica from './eletronica/eletronica';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="telalogin" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="telalogin" component={telalogin} />
        <Stack.Screen name="telaregistro" component={telaregistro} />
        <Stack.Screen name="telasucesso" component={telasucesso} />
        <Stack.Screen name="telaconfig" component={telaconfig} />
        <Stack.Screen name= "editarperfil" component= {editarperfil}/>
        <Stack.Screen name="telasobre" component= {TelaSobre}/>
        <Stack.Screen name="telahome" component= {telahome}/>
        <Stack.Screen name="sertanejo" component= {Sertanejo}/>
        <Stack.Screen name="funk" component= {funk}/>
        <Stack.Screen name="top" component= {top}/>
        <Stack.Screen name="eletronica" component= {eletronica}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
