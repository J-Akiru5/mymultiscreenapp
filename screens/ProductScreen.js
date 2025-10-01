import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

// Products/Services aligned with portfolio skills and featured work
const products = [
  { id: '1', title: 'IT-Tech Portal (Web Dev)', subtitle: 'Full-stack web application', price: 'Starting ,000' },
  { id: '2', title: 'System Error: Bayanihan (Video)', subtitle: 'Short film & promo videos', price: 'Starting ,000' },
  { id: '3', title: 'Digital Art Collection', subtitle: 'Custom illustrations & assets', price: 'Starting ,000' },
  { id: '4', title: 'UI Kits & Templates', subtitle: 'Design systems & components', price: 'Starting ,500' },
  { id: '5', title: 'Workshops & Mentorship', subtitle: 'Web dev / creative workshops', price: 'Contact for quote' },
];

export default function ProductScreen({ navigation }) {
  const theme = (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.theme && Constants.manifest.extra.theme.colors) || {};
  const colors = {
    primary: theme.primary || '#0ea5a4',
    background: theme.background || '#0f1724',
    card: theme.card || '#0b1620',
    text: theme.text || '#f8fafc',
    muted: theme.muted || '#94a3b8',
    accent: theme.accent || '#7c3aed',
  };

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }] }>
      <ImageBackground source={require('../assets/heroBg.png')} style={styles.heroSmall} resizeMode="cover">
        <View style={[styles.heroOverlay, { backgroundColor: colors.background + 'AA' }]} />
        <Text style={[styles.header, { color: colors.text }]}>Services & Projects</Text>
      </ImageBackground>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.productCard, styles.elevatedBox, { backgroundColor: colors.card }] }>
            <View style={styles.productInfo}>
              <Text style={[styles.productTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.productSubtitle, { color: colors.muted }]}>{item.subtitle}</Text>
            </View>
            <View style={styles.productActions}>
              <Text style={[styles.productPrice, { color: colors.primary }]}>{item.price}</Text>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Contact')}>
                <Text style={[styles.primaryBtnText, { color: colors.card }]}>Get Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}> 
        <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.primary }]} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.secondaryBtnText, { color: colors.text }]}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 70,
  },
  header: {
    fontSize: 28,
    color: '#28a745', // fallback color
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  heroSmall: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0f1724AA',
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    width: '100%',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elevatedBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  productSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  productActions: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  primaryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  primaryBtnText: {
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontWeight: '600',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
    marginBottom: 35,
  },
  partItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  partName: {
    fontSize: 16,
    color: '#222',
  },
  partPrice: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
