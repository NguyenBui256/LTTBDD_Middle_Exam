import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2D3436',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Custom header inside index.tsx
          }}
        />
        <Stack.Screen
          name="add-edit"
          options={{
            title: "Chi tiết phòng",
            headerBackTitle: "Trở lại",
          }}
        />
      </Stack>
    </>
  );
}
