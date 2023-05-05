import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const images = [
  {
    id: 1,
    url: "https://images.wallpaperscraft.com/image/single/trees_lake_ice_918498_1080x1920.jpg",
  },
  {
    id: 2,
    url: "https://images.wallpaperscraft.com/image/single/coast_sea_waves_918477_1080x1920.jpg",
  },
  {
    id: 3,
    url: "https://images.wallpaperscraft.com/image/single/road_bridge_river_918481_1080x1920.jpg",
  },
  {
    id: 4,
    url: "https://images.wallpaperscraft.com/image/single/waterfall_rocks_stones_918460_1080x1920.jpg",
  },
  {
    id: 5,
    url: "https://images.wallpaperscraft.com/image/single/lupine_leaves_drops_918456_1080x1920.jpg",
  },
  {
    id: 6,
    url: "https://images.wallpaperscraft.com/image/single/road_forest_northern_lights_918442_1080x1920.jpg",
  },
  {
    id: 7,
    url: "https://images.wallpaperscraft.com/image/single/grass_trees_field_918374_1080x1920.jpg",
  },
  {
    id: 8,
    url: "https://images.wallpaperscraft.com/image/single/boat_coast_sea_918377_1080x1920.jpg",
  },
  {
    id: 9,
    url: "https://images.wallpaperscraft.com/image/single/boat_masts_sails_918362_1080x1920.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("FullScreen")}>
        <Text style={styles.btn}>Navigate to Details</Text>
      </TouchableOpacity> */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back-outline"
          size={25}
          color={"#fb8500"}
          style={{
            opacity: 0,
          }}
        />
        <Text style={styles.text}>Wallpaper</Text>
        <TouchableOpacity onPress={() => navigation.navigate("FullScreen")}>
          <Ionicons name={"search-outline"} size={25} color={"#fb8500"} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("FullScreen", { item })}
              style={{
                flex: 1,
                height: 200,
                marginRight: index % 3 !== 2 ? 4 : 0,
                marginBottom: 4,
                borderRadius: 12,
              }}
            >
              <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

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
  btn: {
    color: "#52889f",
  },
  item: {
    flex: 1,
    height: 120,
    backgroundColor: "#fb8500",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius: 12,
  },
});
