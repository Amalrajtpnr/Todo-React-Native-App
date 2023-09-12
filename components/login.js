import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login logic
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://todo-0rhb.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();

      // Navigate to the TodoApp component
      props.navigation.navigate("TodoApp");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 200,
  },
  registerLink: {
    marginTop: 10,
    color: "blue",
  },
});

export default Login;
