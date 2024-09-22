import React, { useState, createContext, useContext } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';

// Create a context for accessibility mode
const AccessibilityContext = createContext();

const Homee = () => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  return (
    <AccessibilityContext.Provider value={{ accessibilityMode, setAccessibilityMode }}>
      <View style={styles.container}>
        <ToggleButton />
        <AccessibleComponent />
      </View>
    </AccessibilityContext.Provider>
  );
};

const ToggleButton = () => {
  const { accessibilityMode, setAccessibilityMode } = useContext(AccessibilityContext);

  return (
    <View style={styles.toggleContainer}>
      <Text>Accessibility Mode</Text>
      <Switch
        value={accessibilityMode}
        onValueChange={setAccessibilityMode}
      />
    </View>
  );
};

const AccessibleComponent = () => {
  const { accessibilityMode } = useContext(AccessibilityContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: accessibilityMode ? 24 : 16 }}>
        {accessibilityMode ? 'High Contrast Mode' : 'Normal Mode'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    marginBottom: 20,
  },
});

export default Homee;
