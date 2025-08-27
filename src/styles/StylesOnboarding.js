import { StyleSheet } from "react-native";

export const StylesOnboarding = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "brown",
    fontSize: 40,
    fontWeight: "bold",
  },

  txt: {
    color: "brown",
  },

  viewSignUp: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  btn: {
    backgroundColor: "grey",
    width: "80%",
    padding: 10,
    alignItems: "center",
    marginTop: 200,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 5,
  },

  txt2: {
    color: "#fff",
  },
});
