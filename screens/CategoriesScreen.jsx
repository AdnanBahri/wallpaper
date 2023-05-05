import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

const data = [
  {
    title: "abstract",
    background:
      "https://images.wallpaperscraft.com/image/single/snow_leopard_big_cat_predator_923680_300x168.jpg",
  },
  {
    title: "animals",
    background:
      "https://images.wallpaperscraft.com/image/single/pier_couple_silhouettes_923678_300x168.jpg",
  },
  {
    title: "anime",
    background:
      "https://images.wallpaperscraft.com/image/single/road_northern_lights_night_923670_300x168.jpg",
  },
  {
    title: "art",
    background:
      "https://images.wallpaperscraft.com/image/single/magnolia_petals_macro_923666_300x168.jpg",
  },
  {
    title: "Black and white",
    background:
      "https://images.wallpaperscraft.com/image/single/lighthouse_stones_sea_923651_300x168.jpg",
  },
  {
    title: "Fantasy",
    background:
      "https://images.wallpaperscraft.com/image/single/lighthouse_stones_sea_923651_300x168.jpg",
  },
  {
    title: "Flowers",
    background:
      "https://images.wallpaperscraft.com/image/single/dahlia_flowers_petals_923629_300x168.jpg",
  },
  {
    title: "Nature",
    background:
      "https://images.wallpaperscraft.com/image/single/girl_halo_dress_923615_300x168.jpg",
  },
  {
    title: "Textures",
    background:
      "https://images.wallpaperscraft.com/image/single/ford_expedition_xlt_ford_car_923608_300x168.jpg",
  },
];

const SCREEN_WIDDTH = Dimensions.get("window").width;

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Ionicons name="arrow-back-outline" size={25} color={"#fb8500"} />
        </TouchableOpacity>
        <Text style={styles.text}>Wallpaper</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name={"search-outline"} size={25} color={"#fb8500"} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 20,
          }}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => {}}
              style={{
                width: (SCREEN_WIDDTH - 50) / 2,
                height: 100,
                marginBottom: 8,
                borderRadius: 12,
                marginRight: index % 2 === 0 ? 10 : 0,
              }}
            >
              <ImageBackground
                source={{ uri: item.background }}
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                }}
                imageStyle={{ borderRadius: 12 }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,.5)",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;

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
});
