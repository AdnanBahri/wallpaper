import {
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import Dialog from "../components/Dialog";

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

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

const FullScreen = ({ route: { params }, navigation }) => {
  const [activePosition, setActivePosition] = useState(
    images.findIndex((item) => item.id === params.item.id)
  );
  const [isVisible, setIsVisible] = useState(false);
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
    scrollToActivePosition(activePosition);
  }, []);
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
          <Ionicons name={"bookmark-outline"} size={25} color={"#fb8500"} />
        </TouchableOpacity>
      </View>
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
                source={{ uri: item.url }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
        pagingEnabled
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
                source={{ uri: item.url }}
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
      <Dialog
        dismiss={() => setIsVisible(false)}
        styles={styles.dialog}
        transparent={true}
        visible={isVisible}
      >
        <Text>Apply</Text>
        <TouchableOpacity>
          <Text>Home Screen Wallpaper</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Lock Screen Wallpaper</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Both</Text>
        </TouchableOpacity>
      </Dialog>
    </View>
  );
};

export default FullScreen;

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
    borderRadius: 12,
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
