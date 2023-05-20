import { ParamListBase } from '@react-navigation/routers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './screens/Home';
import Details from './screens/Details';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export interface RootParamList extends ParamListBase {
  Home: undefined;
  Details: undefined;
}
