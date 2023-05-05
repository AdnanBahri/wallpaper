import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocaleStoarge = () => {
  const storeData = async (key, value) => {
    const isStored = await getData(key);
    if (!isStored || isStored !== value) AsyncStorage.setItem(key, value);
  };

  const getData = async (key) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
    return null;
  };

  const storeWallpaper = async (value) => {
    try {
      // const savedBookmarks = await retreiveWallpapers();
      // const newBookmarks = [...savedBookmarks, AsyncStorage, value];
      const jsonBookmarks = JSON.stringify(value);
      await AsyncStorage.setItem("bookmarks", jsonBookmarks);
    } catch (e) {
      console.warn("Store Wallpaper Failed", e);
    }
  };

  const retreiveWallpapers = async () => {
    try {
      const data = await AsyncStorage.getItem("bookmarks");
      return data !== null ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Retrieving Wallpapers Failed", e);
    }
  };

  return { storeData, getData, storeWallpaper, retreiveWallpapers };
};
