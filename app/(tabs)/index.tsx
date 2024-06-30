import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { List, Text, IconButton } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { fetchAllDrills, fetchRandomDrills, fetchDrillByTag } from "@/libraries/http";
import { DrillContext } from "@/app/_layout";
import { router } from "expo-router";
import { NumberPicker } from "@/components/NumberPicker";

const colours = useColours();

export interface Drill {
  id: number;
  name: string;
}

export default function Index() {

  const [numDrills, setNumDrills] = useState(1);
  const drillContext = useContext(DrillContext);

  // Check if the context is defined
  if (!drillContext) {
    throw new Error("DrillContext is not defined");
  }

  const { drills, setDrills } = drillContext;

  // Handler for the button to fetch all drills
  const handleClickAllDrills = async () => {
    const data = await fetchAllDrills();
    setDrills(data as Drill[]);
    router.push('/workoutScreen');
  };

  // Handler for the button to fetch random drills
  const handleClickRandomDrills = async () => {
    const data = await fetchRandomDrills(numDrills);
    setDrills(data as Drill[]);
    router.push('/workoutScreen');

  };

  const handleClickJudoDrills = async () => {
    const data = await fetchDrillByTag('judo', numDrills);
    setDrills(data as Drill[]);
    router.push('/workoutScreen');

  };

  const handleClickBasicDrills = async () => {
    const data = await fetchDrillByTag('basic', numDrills);
    setDrills(data as Drill[]);
    router.navigate('/workoutScreen');
  };

  const handleClickDecrementDrills = async () => {
    numDrills > 1 && setNumDrills(numDrills - 1);
  };

  const handleClickIncrementDrills = async () => {
    setNumDrills(numDrills + 1);
  };

  return (
    <View style={styles.container}>
      <NumberPicker title="Number of drills"
      decrement={handleClickDecrementDrills}
      increment={handleClickIncrementDrills}
      num={numDrills}
      />
      <List.Section style={styles.accordionSection}>
        <List.Accordion title="Choose your drills" titleStyle={styles.accordion} style={styles.accordion} >

          <List.Item style={styles.listItem}
            titleStyle={styles.listItemTitle}
            title="Random"
            onPress={handleClickRandomDrills}
          />
          <List.Item style={styles.listItem}
            titleStyle={styles.listItemTitle}
            title="Judo"
            onPress={handleClickJudoDrills}
          />
          <List.Item style={styles.listItem}
            titleStyle={styles.listItemTitle}
            title="Basic"
            onPress={handleClickBasicDrills}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.secondary,
    color: colours.light,
    padding: 10,
  },
  accordionSection: {
    width: "100%",
    backgroundColor: colours.accent,
    color: colours.light,
  },
  accordion: {
    width: "100%",
    backgroundColor: colours.accent,
    color: colours.light,
  },
  listItem: {
    backgroundColor: colours.accent,
  },
  listItemTitle: {
    color: colours.light,
  },
  text: {

  },
  numberPicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});