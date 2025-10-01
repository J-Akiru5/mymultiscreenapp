import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function HomeScreen({ navigation }) {
  const theme = (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.theme && Constants.manifest.extra.theme.colors) || {};
  const colors = {
    primary: theme.primary || '#0ea5a4',
    background: theme.background || '#082032',
    backgroundLight: '#106fa4',
    card: theme.card || '#0b1620',
    text: theme.text || '#f8fafc',
    accent: theme.accent || '#7c3aed',
  };

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <View style={styles.hero}>
        <View style={[styles.titleBox, styles.elevatedBox, { backgroundColor: (colors.card || '#0b1620') + 'CC' }] }>
          <Text style={[styles.title, { color: colors.text }]}>My Personal Portfolio</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>IT3121 Activity 3</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary, marginHorizontal: 8 }]} onPress={() => navigation.navigate('About')}>
            <Text style={styles.btnText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary, marginHorizontal: 8 }]} onPress={() => navigation.navigate('Product')}>
            <Text style={styles.btnText}>Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary, marginHorizontal: 8 }]} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.btnText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.9,
  },
  buttons: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 35,
  },
  titleBox: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    borderRadius: 12,
    alignItems: 'center',
  },
  elevatedBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  btnText: {
    color: '#071422',
    fontWeight: '600',
  },
});
