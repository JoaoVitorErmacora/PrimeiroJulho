import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  button

} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Button } from "react-native-web";

import { StatusBar } from "expo-status-bar";

// Import Styles!
import { StylesOnboarding } from "../styles/StylesOnboarding";

// Import Icon!
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Onboarding() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={StylesOnboarding.container}
      source={require("../assets/images/cinema.jpg")}
      blurRadius={15}
    >
      <MaterialCommunityIcons
        name="movie-roll"
        size={200}
        color="white"
      />

      <Text style={StylesOnboarding.title}>BEM VINDO</Text>

      <Text style={StylesOnboarding.txt}>Tenha acesso à melhor galeria .</Text>
      <Text style={StylesOnboarding.txt}>de filmes do Brasil.</Text>

      <TouchableOpacity
        style={StylesOnboarding.btn}
        onPress={() => navigation.navigate("galeria")}
      >
        <Text style={StylesOnboarding.txt2}>Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={StylesOnboarding.btn}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={StylesOnboarding.txt2}>Login With Email</Text>
      </TouchableOpacity>

      <View style={StylesOnboarding.viewSignUp}>
        <Text style={StylesOnboarding.txt2}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign Up</Text>
        </Pressable>
      </View>

      <StatusBar hidden />
    </ImageBackground>
  );
}
