import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { useLocaleStoarge } from "../hooks/useLocalStorage";

const SettingsScreen = ({ navigation }) => {
  const { storeData, getData } = useLocaleStoarge();
  const [selected, setSelected] = useState("");

  const changeTheme = (theme) => {
    if (theme !== selected) {
      setSelected(theme);
      storeData("theme", theme);
    }
  };

  useEffect(() => {
    const checkTheme = async () => {
      const theme = await getData("theme");
      if (theme) setSelected(theme);
    };
    checkTheme();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Ionicons name="arrow-back-outline" size={25} color={"#fb8500"} />
        </TouchableOpacity>
        <Text style={styles.text}>Settings</Text>
        <Ionicons
          name={"search-outline"}
          size={25}
          color={"#fb8500"}
          style={{ opacity: 0 }}
        />
      </View>
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: "#797e83",
            marginLeft: 20,
          }}
        >
          Theme
        </Text>

        <View style={styles.listContainer}>
          <TouchableOpacity onPress={() => changeTheme("Automatic")}>
            <View
              style={{
                flexDirection: "row",
                height: 65,
                alignItems: "center",
                borderBottomColor: "#797e83",
                paddingHorizontal: 20,
                borderBottomWidth: 0.5,
              }}
            >
              <MaterialCommunityIcons
                name="circle-half-full"
                size={18}
                color="#fff"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#fff",
                  paddingHorizontal: 20,
                }}
              >
                Automatic
              </Text>
              {/* <View style={{ flex: 1 }} /> */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: "#797e83",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                }}
              >
                <View
                  style={{
                    width: 13,
                    height: 13,
                    backgroundColor:
                      selected === "Automatic" ? "#fff" : "transparent",
                    borderRadius: 13,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeTheme("Light")}>
            <View
              style={{
                flexDirection: "row",
                height: 65,
                alignItems: "center",
                borderBottomColor: "#797e83",
                paddingHorizontal: 20,
                borderBottomWidth: 0.5,
              }}
            >
              <Ionicons name="ios-sunny" size={18} color={"#fff"} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#fff",
                  paddingHorizontal: 20,
                }}
              >
                Light
              </Text>
              {/* <View style={{ flex: 1 }} /> */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: "#797e83",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                }}
              >
                <View
                  style={{
                    width: 13,
                    height: 13,
                    backgroundColor:
                      selected === "Light" ? "#fff" : "transparent",
                    borderRadius: 13,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeTheme("Dark")}>
            <View
              style={{
                flexDirection: "row",
                height: 65,
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Ionicons name="ios-moon" size={18} color={"#fff"} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#fff",
                  paddingHorizontal: 20,
                }}
              >
                Dark
              </Text>
              {/* <View style={{ flex: 1 }} /> */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: "#797e83",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                }}
              >
                <View
                  style={{
                    width: 13,
                    height: 13,
                    backgroundColor:
                      selected === "Dark" ? "#fff" : "transparent",
                    borderRadius: 13,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            color: "#797e83",
            paddingHorizontal: 24,
            lineHeight: 18,
          }}
        >
          Automatic is only supported on operating systems that allow you to
          control the system-wide scheme.
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252a32",
    // backgroundColor: "#151a23",252a32
    paddingTop: Platform.OS === "android" && 25,
  },
  toolbar: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    // color: "#797e83",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  listContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: "#151a23",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#797e83",
  },
});
