import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { useLocaleStoarge } from "../hooks/useLocalStorage";

// const images = [
//   "https://images.wallpaperscraft.com/image/single/trees_lake_ice_918498_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/coast_sea_waves_918477_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/road_bridge_river_918481_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/waterfall_rocks_stones_918460_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/lupine_leaves_drops_918456_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/road_forest_northern_lights_918442_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/grass_trees_field_918374_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/boat_coast_sea_918377_1080x1920.jpg",
//   "https://images.wallpaperscraft.com/image/single/boat_masts_sails_918362_1080x1920.jpg",
// ];

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

const BookmarkScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [activePosition, setActivePosition] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const { retreiveWallpapers } = useLocaleStoarge();
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

  useEffect(() => {
    const check = async () => {
      const data = await retreiveWallpapers();
      if (data !== null && data.length > 0) setBookmarks(data);
    };
    check();
  }, [isFocused]);

  if (bookmarks.length === 0)
    return (
      <View
        style={[
          styles.container,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={styles.text}>You have no Wallpaper Saved</Text>
      </View>
    );
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
      <FlatList
        ref={topRef}
        data={bookmarks}
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
        pagingEnabled
      />
      <FlatList
        data={bookmarks}
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

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
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
});
