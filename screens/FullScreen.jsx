import { FlatList, StyleSheet, Image, View } from "react-native";
import React from "react";

const images = [
  "https://images.wallpaperscraft.com/image/single/trees_lake_ice_918498_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/coast_sea_waves_918477_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/road_bridge_river_918481_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/waterfall_rocks_stones_918460_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/lupine_leaves_drops_918456_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/road_forest_northern_lights_918442_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/grass_trees_field_918374_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/boat_coast_sea_918377_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/boat_masts_sails_918362_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/trees_lake_ice_918498_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/coast_sea_waves_918477_1080x1920.jpg",
  "https://images.wallpaperscraft.com/image/single/road_bridge_river_918481_1080x1920.jpg",
];

const FullScreen = ({ route: { params } }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: params.uri }}
        style={[StyleSheet.absoluteFillObject]}
      />
    </View>
  );
};

export default FullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252a32",
    // paddingTop: Platform.OS === "android" && 25,
  },
});
