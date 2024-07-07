import { Stack } from "expo-router/stack";
import { createContext, useState } from "react";
import { PaperProvider, MD2LightTheme, MD3Colors, MD2DarkTheme, MD3LightTheme } from "react-native-paper";


export interface Drill {
  id: number;
  name: string;
  video_url : string;
}

import React from 'react';

interface DrillContextType {
  drills: Drill[];
  setDrills: React.Dispatch<React.SetStateAction<Drill[]>>;
}

// Initialize the context with undefined. The actual value will be provided by a Provider.


export const DrillContext = React.createContext<DrillContextType | undefined>(undefined);

export default function Layout() {
  const [drills, setDrills] = useState<Drill[]>([]);


  return (
    <PaperProvider theme={MD3LightTheme}>
      <DrillContext.Provider value={{ drills, setDrills }}>
        <Stack>
          <Stack.Screen name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </DrillContext.Provider>
    </PaperProvider>
  );
}