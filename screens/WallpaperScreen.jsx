import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useLocaleStoarge } from "../hooks/useLocalStorage";
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const WallpaperScreen = ({ navigation, route: { params } }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const { retreiveWallpapers, storeWallpaper } = useLocaleStoarge();
  const { item } = params;
  const handleBookmark = async () => {
    const list = await retreiveWallpapers();
    if (saved) {
      const newList = list.filter((wallpaper) => wallpaper !== item.url);
      await storeWallpaper(newList);
      setIsSaved(false);
    } else {
      const newList = [...list, item.url];
      await storeWallpaper(newList);
      setIsSaved(true);
    }
  };

  useEffect(() => {
    const check = async () => {
      const data = await retreiveWallpapers();
      if (data !== null && data.indexOf(item.url) !== -1) setIsSaved(true);
    };
    check();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ position: "absolute", width, height }}
        source={{ uri: item.url }}
      />
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Ionicons name="arrow-back-outline" size={25} color={"#fb8500"} />
        </TouchableOpacity>
        <Text style={styles.text}>Wallpaper</Text>
        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={25}
            color={"#fb8500"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.btn}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: "#797e83",
            textAlign: "center",
            textTransform: "uppercase",
            paddingVertical: 12,
          }}
        >
          Set as wallpaper
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WallpaperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252a32",
    // backgroundColor: "#151a23",252a32
  },
  toolbar: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  text: {
    // color: "#797e83",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    height: "25%",
    width: "80%",
    backgroundColor: "#25292e",
    borderRadius: 18,
    position: "absolute",
  },
});
