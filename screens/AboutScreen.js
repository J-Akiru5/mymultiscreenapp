import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

// We need to receive the "navigation" prop to move between screens
export default function AboutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
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
    <ScrollView contentContainerStyle={[
      styles.container,
      { paddingBottom: Math.max(24, (insets.bottom || 0) + 24) }
    ]}>
      <ImageBackground source={require('../assets/heroBg.png')} style={styles.hero} resizeMode="cover">
        <View style={[styles.heroOverlay, { backgroundColor: colors.background + 'CC' }]} />
        <View style={styles.heroContent}>
          <Text style={[styles.heroName, { color: colors.text }]}>Jeff Edrick Martinez</Text>
          <Text style={[styles.heroSubtitle, { color: colors.muted }]}>IT Student | Web Developer | Creative Director</Text>
        </View>
      </ImageBackground>

  <View style={[styles.card, styles.elevatedBox, { backgroundColor: colors.card }] }>
        <Image
          source={require('../assets/profilepic.jpg')}
          style={styles.profile}
        />

  <Text style={[styles.header, { color: colors.text }]}>About Me</Text>

  <Text style={[styles.bodyText, { color: colors.text }] }>
          A third-year IT student and the Pioneering President of the SineAI Guild, specializing in web development, video production, and digital arts. Passionate about technology, creativity, and leadership.
        </Text>

  <Text style={[styles.bodyText, { color: colors.text }] }>
          My journey in technology began with curiosity and has evolved into a passion for creating digital experiences that matter. As a third-year IT student, I've developed expertise in web development, video production, and digital arts.
        </Text>

  <Text style={[styles.bodyText, { color: colors.text }] }>
          Beyond the digital realm, I'm a well-rounded individual who enjoys beatboxing, swimming, and calisthenics. These diverse interests fuel my creativity and bring unique perspectives to my technical work.
        </Text>

        <Text style={[styles.ownerText, { color: colors.muted }] }>
          <Text style={{ fontWeight: 'bold', color: colors.text }}>Role: </Text>Pioneering President, SineAI Guild
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.primaryBtnText, { color: colors.card }]}>Go Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: colors.primary }]}
            onPress={() => navigation.navigate('Contact', { product: 'IT-Tech Portal (Web Dev)' })}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>Contact Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    flexGrow: 1,
    marginTop: 70,
    
  },
  header: {
    fontSize: 32,
    color: '#24251fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  hero: {
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
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  profile: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  ownerText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  }
  ,
  card: {
    width: '100%',
    maxWidth: 900,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
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
  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryBtnText: {
    fontWeight: '700',
    color: '#0b1620',
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontWeight: '600',
    color: '#fff',
  }
});
