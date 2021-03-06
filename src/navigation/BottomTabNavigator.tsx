import { React } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import TriageScreen from '../screens/TriageScreen';
import TimelineScreen from '../screens/TimelineScreen';
import MapScreen from '../screens/MapScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Triage';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Triage"
        component={TriageScreen}
        options={{
          title: 'Triage',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              font={Ionicons}
              focused={focused}
              name="md-checkbox-outline"
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: 'Timeline',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon font={Ionicons} focused={focused} name="md-analytics" />
          )
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon font={Ionicons} focused={focused} name="md-pin" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Triage':
      return 'Triage your symptoms';
    case 'Timeline':
      return 'Symptoms Timeline';
    case 'Map':
      return 'Map of Nearest Medical Help';
  }
}
