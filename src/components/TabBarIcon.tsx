import * as React from 'react';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const TabIcon = props.font; // import from'@expo/vector-icons';
  return (
    <TabIcon
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
