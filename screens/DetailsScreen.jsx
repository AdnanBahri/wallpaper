import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

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
];

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

const DetailsScreen = () => {
  const [activePosition, setActivePosition] = useState(0);
  const topRef = useRef();
  const thumbRef = useRef();
  const scrollToActivePosition = (index) => {
    setActivePosition(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - (width - IMAGE_SIZE) / 2,
        animated: true,
      });
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollBegin={(ev) =>
          scrollToActivePosition(
            Math.round(ev.nativeEvent.contentOffset.x / width)
          )
        }
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={images}
        ref={thumbRef}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActivePosition(index)}>
              <Image
                source={{ uri: item }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor:
                    activePosition === index ? "#fff" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a23",
  },
});
