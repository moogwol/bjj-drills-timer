import { Tabs } from "expo-router";
import { Icon, MD3LightTheme } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DrillContext } from "../_layout";

const colours = useColours();


export default function RootLayout() {
  const drillContext = useContext(DrillContext);
  const [workouButtonEnabled, setWorkoutButtonEnabled] = useState(true);

  // // Check if the context is defined
  // if (!drillContext) {
  //   throw new Error("DrillContext is not defined");
  // }

  // const { drills } = drillContext;

  // const isTabEnabled = drills.length > 0;

  useEffect(() => {
    try {
      if (!drillContext) {
        throw new Error("DrillContext is not defined");
      }
      
      const { drills } = drillContext;
      setWorkoutButtonEnabled(drills.length > 0);

      // Logic to enable/disable tab based on isTabEnabled
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  }, [drillContext]); // React to changes in drillContext

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
          tabBarButton: (props) => (workouButtonEnabled ? <TouchableOpacity {...props} /> : null),
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
