import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FullScreen from "../screens/FullScreen";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "../screens/CategoriesScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WallpaperScreen from "../screens/WallpaperScreen";

const MainStack = createStackNavigator();

const BottomTabs = createBottomTabNavigator();

const HomeStack = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    <MainStack.Screen name="FullScreen" component={WallpaperScreen} />
  </MainStack.Navigator>
);

export const AppNavigator = () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#151a23",
        borderTopColor: "transparent",
      },
    }}
  >
    <BottomTabs.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "ios-home" : "ios-home-outline"}
            size={25}
            color={"#fb8500"}
          />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "folder-open" : "folder-open-outline"}
            size={25}
            color={"#fb8500"}
          />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Bookmark"
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "bookmark" : "bookmark-outline"}
            size={25}
            color={"#fb8500"}
          />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "settings" : "settings-outline"}
            size={25}
            color={"#fb8500"}
          />
        ),
      }}
    />
  </BottomTabs.Navigator>
);
