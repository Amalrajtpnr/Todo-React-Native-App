import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login.js"; // Import the Login component
import Register from "./components/register.js"; // Import the Register component
import TodoApp from "./components/todo.js";

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="TodoApp" component={TodoApp} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
