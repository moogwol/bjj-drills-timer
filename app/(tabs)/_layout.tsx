import { Tabs } from "expo-router";
import { Icon, MD3LightTheme } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const colours = useColours();


export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} >
      <Tabs.Screen
        name="index"
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          tabBarLabel: "Home",
          tabBarLabelStyle: styles.label,
          tabBarStyle: styles.tabBar,
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" color={colours.light} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="workoutScreen"
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          tabBarLabel: "Workout",
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
          headerTitle: "Workout",
          tabBarIconStyle: styles.icon,
          tabBarIcon: ({ color, size }) => (
            <Icon source="run" color={colours.light} size={size} />
          ),
        }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colours.accent,
  },
  icon: {
    color: colours.light,
  },
  label: {
    color: colours.light,
    fontSize: 12,
  },
  header: {
    backgroundColor: colours.accent,    
  },
  headerTitle: {
    color: colours.light,
  }
});  
