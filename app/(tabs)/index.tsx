import { View, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { List, Checkbox, Button } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { fetchDrillsByTags } from "@/libraries/http";
import { Drill, DrillContext } from "@/app/_layout";
import { router } from "expo-router";
import { NumberPicker } from "@/components/NumberPicker";

const colours = useColours();


export default function Index() {

  const [numDrills, setNumDrills] = useState(1);
  const drillContext = useContext(DrillContext);
  const [workouButtonDisabled, setWorkoutButtonDisabled] = useState(true);

  // Checkbox states
  const [judoChecked, setJudoChecked] = useState(false);
  const [basicChecked, setBasicChecked] = useState(false);
  const [advancedChecked, setAdvancedChecked] = useState(false);
  const [takedownsChecked, setTakedownsChecked] = useState(false);
  const [roundsOnlyChecked, setRoundsOnlyChecked] = useState(false);


  // Check if the context is defined
  if (!drillContext) {
    throw new Error("DrillContext is not defined");
  }

  const { drills, setDrills } = drillContext;


  // Handle the click event for the "Go to workout" button  
  const handleClickGoToWorkout = async () => {
    if (!roundsOnlyChecked) {
      // Get the drills from the database
      const tags = [];
      if (judoChecked) tags.push('judo');
      if (basicChecked) tags.push('basic');
      if (advancedChecked) tags.push('advanced');
      if (takedownsChecked) tags.push('takedown');
      console.log('Chosen tags:', tags);
      const data = await fetchDrillsByTags(tags, numDrills);
      setDrills(data as Drill[]);
      console.log(data);
      router.push('/workoutScreen')
    } else {
      // Create an array of round with the round number
      const drills = []
      for (let i = 0; i < numDrills; i++) {
        drills.push({ name: 'Round ' + (i + 1) });
        router.push('/workoutScreen')
      }
      setDrills(drills as Drill[]);
    }
  }

  const handleClickDecrementDrills = async () => {
    numDrills > 1 && setNumDrills(numDrills - 1);
  };

  const handleClickIncrementDrills = async () => {
    setNumDrills(numDrills + 1);
  };

  // Set the workout button to disabled if no checkboxes are checked
  useEffect(() => {
    if (roundsOnlyChecked || judoChecked || basicChecked || advancedChecked || takedownsChecked) {
      setWorkoutButtonDisabled(false);
    } else {
      setWorkoutButtonDisabled(true);
    }
  }, [roundsOnlyChecked, judoChecked, basicChecked, advancedChecked, takedownsChecked]);  


  return (
    <View style={styles.container}>
      <NumberPicker title={`Number of ${roundsOnlyChecked ? 'rounds' : 'drills'}`}
        decrement={handleClickDecrementDrills}
        increment={handleClickIncrementDrills}
        num={numDrills}
      />

      <List.Section style={styles.accordionSection}>
        <List.Accordion testID="accordion" title="Choose your drills" titleStyle={styles.accordion} style={styles.accordion} >
          <Checkbox.Item testID="roundsCheckbox" label="Rounds only" labelStyle={styles.checkboxLabel} color={colours.light} uncheckedColor={colours.light} status={roundsOnlyChecked ? 'checked' : 'unchecked'} onPress={() => setRoundsOnlyChecked(!roundsOnlyChecked)} />
          <Checkbox.Item label="Judo" labelStyle={styles.checkboxLabel} color={colours.light} uncheckedColor={colours.light} status={judoChecked ? 'checked' : 'unchecked'} disabled={roundsOnlyChecked} onPress={() => setJudoChecked(!judoChecked)} />
          <Checkbox.Item label="Basic" labelStyle={styles.checkboxLabel} color={colours.light} uncheckedColor={colours.light} status={basicChecked ? 'checked' : 'unchecked'} disabled={roundsOnlyChecked} onPress={() => setBasicChecked(!basicChecked)} />
          <Checkbox.Item label="Advanced" labelStyle={styles.checkboxLabel} color={colours.light} uncheckedColor={colours.light} status={advancedChecked ? 'checked' : 'unchecked'} disabled={roundsOnlyChecked} onPress={() => setAdvancedChecked(!advancedChecked)} />
          <Checkbox.Item label="Takedowns" labelStyle={styles.checkboxLabel} color={colours.light} uncheckedColor={colours.light} status={takedownsChecked ? 'checked' : 'unchecked'} disabled={roundsOnlyChecked} onPress={() => setTakedownsChecked(!takedownsChecked)} />
        </List.Accordion>
      </List.Section>
      <Button testID="workoutButton" disabled={workouButtonDisabled} buttonColor={colours.primary} mode="contained" onPress={handleClickGoToWorkout}>Go to workout</Button>
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
  checkbox: {
    backgroundColor: colours.accent,
    fontSize: 50,
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: colours.light,
  },
});