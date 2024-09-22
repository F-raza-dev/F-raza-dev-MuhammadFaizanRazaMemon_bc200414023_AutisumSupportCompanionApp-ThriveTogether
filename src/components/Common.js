import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../Hooks/ThemeContext';
import { useFontSize, fontSizes } from '../Hooks/FontSizeContext';

const Common = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const { theme, changeTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    setFontSizeModalVisible(false);
  };

  const handleThemeChange = (color) => {
    changeTheme(color);
    setThemeModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {children}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} color="#262626" />
      </TouchableOpacity>

      {/* Main Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setFontSizeModalVisible(true)}>
              <Text style={[styles.text, { color: theme.textColor, fontSize }]}>Change Font Size</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setThemeModalVisible(true)}>
              <Text style={[styles.text, { color: theme.textColor, fontSize }]}>Change Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.closeButton, { color: theme.textColor, fontSize }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Font Size Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={fontSizeModalVisible}
        onRequestClose={() => setFontSizeModalVisible(!fontSizeModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {Object.keys(fontSizes).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.modalButton, { backgroundColor: '#f8f8f8' }]}
                onPress={() => handleFontSizeChange(fontSizes[key])}
              >
                <Text style={[styles.text, { fontSize: fontSizes[key] }]}>{key.charAt(0).toUpperCase() + key.slice(1)} Font</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setFontSizeModalVisible(!fontSizeModalVisible)}>
              <Text style={[styles.closeButton, { color: theme.textColor, fontSize }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Theme Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(!themeModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#FFDAB9' }]} // Example color
              onPress={() => handleThemeChange('#FFDAB9')}
            >
              <Text style={[styles.text, { color: '#000000', fontSize }]}>Red Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#B8E2C8' }]} // Example color
              onPress={() => handleThemeChange('#B8E2C8')}
            >
              <Text style={[styles.text, { color: '#000000', fontSize }]}>Green Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#C3B1E1' }]} // Example color
              onPress={() => handleThemeChange('#C3B1E1')}
            >
              <Text style={[styles.text, { color: '#000000', fontSize }]}>Blue Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setThemeModalVisible(!themeModalVisible)}>
              <Text style={[styles.closeButton, { color: theme.textColor, fontSize }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#e2e8f0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color:"black"
  },
});

export default Common;
