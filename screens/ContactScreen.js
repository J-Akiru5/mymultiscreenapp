import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, Modal, Animated } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';

// Receive the "navigation" prop
export default function ContactScreen({ navigation, route }) {
  const theme = (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.theme && Constants.manifest.extra.theme.colors) || {};
  const colors = {
    primary: theme.primary || '#0ea5a4',
    background: theme.background || '#0f1724',
    card: theme.card || '#0b1620',
    text: theme.text || '#f8fafc',
    muted: theme.muted || '#94a3b8',
  };

  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('IT-Tech Portal (Web Dev)');
  const [message, setMessage] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);

  // refs to hold animated values for the modal options
  const animRefs = useRef({});

  const productOptions = [
    'IT-Tech Portal (Web Dev)',
    'System Error: Bayanihan (Video)',
    'Digital Art Collection',
    'UI Kits & Templates',
    'Workshops & Mentorship',
  ];

  useEffect(() => {
    // if navigated with a product param, prefill the product field
    if (route && route.params && route.params.product) {
      setProduct(route.params.product);
    }
  }, [route]);

  function validateEmail(e) {
    const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\\]\\.,;:\s@\"]+\.)+[^<>()[\\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(e).toLowerCase());
  }

  function handleSend() {
    if (!email || !validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    if (!message || message.trim().length < 5) {
      Alert.alert('Message too short', 'Please enter a message describing your request.');
      return;
    }

    // For now, just show a confirmation - replace with API call as needed
    Alert.alert('Message sent', `Thanks! We'll contact you at ${email} regarding: ${product}`);
    setEmail('');
    setMessage('');
    setProduct(productOptions[0]);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={[styles.container, { backgroundColor: 'transparent' }] }>
          <View style={[styles.headerBox, styles.elevatedBox, { backgroundColor: colors.card + 'CC' }]}>
            <Text style={[styles.header, { color: colors.text }]}>Contact Me</Text>
          </View>

          <View style={styles.logoWrap}>
            <ContactIcon size={88} fill={colors.primary} />
          </View>

          <View style={styles.contactList}>
            <View style={styles.contactRow}>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Email</Text>
              <TouchableOpacity
                style={[styles.contactChip, { backgroundColor: colors.card + 'DD' }]}
                onPress={async () => { await Clipboard.setStringAsync('jeffmartinez@isufst.edu.ph'); Alert.alert('Copied', 'Email copied to clipboard'); }}
              >
                <Text style={[styles.contactChipText, { color: colors.text }]}>{email || 'jeffmartinez@isufst.edu.ph'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactRow}>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Phone</Text>
              <TouchableOpacity
                style={[styles.contactChip, { backgroundColor: colors.card + 'DD' }]}
                onPress={async () => { await Clipboard.setStringAsync('+639519167103'); Alert.alert('Copied', 'Phone number copied to clipboard'); }}
              >
                <Text style={[styles.contactChipText, { color: colors.text }]}>+63 951 916 7103</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.muted }]}>Your email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card + 'CC', color: colors.text }]}
              placeholder="you@example.com"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: colors.muted, marginTop: 12 }]}>Product / Service</Text>
            <TouchableOpacity style={[styles.input, { backgroundColor: colors.card + 'CC', justifyContent: 'center' }]} onPress={() => setPickerVisible(true)}>
              <Text style={{ color: colors.text }}>{product}</Text>
            </TouchableOpacity>

            <Modal visible={pickerVisible} transparent animationType="fade" onRequestClose={() => setPickerVisible(false)}>
              <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPickerVisible(false)}>
                <View style={[styles.modalContent, { backgroundColor: colors.card + 'EE' }]}> 
                  <ScrollView>
                    {productOptions.map((opt) => {
                      // create an Animated.Value for this option if missing
                      if (!animRefs.current[opt]) animRefs.current[opt] = new Animated.Value(1);
                      const scale = animRefs.current[opt];
                      return (
                        <TouchableOpacity
                          key={opt}
                          activeOpacity={0.9}
                          onPress={() => {
                            // animate a quick scale down/up for selection feedback
                            Animated.sequence([
                              Animated.timing(scale, { toValue: 0.92, duration: 100, useNativeDriver: true }),
                              Animated.timing(scale, { toValue: 1.06, duration: 120, useNativeDriver: true }),
                              Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
                            ]).start(() => {
                              setProduct(opt);
                              setPickerVisible(false);
                            });
                          }}
                        >
                          <Animated.View style={[styles.modalOption, { transform: [{ scale }] }] }>
                            <Text style={[styles.modalOptionText, { color: colors.text }]}>{opt}</Text>
                          </Animated.View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>

            <Text style={[styles.label, { color: colors.muted, marginTop: 12 }]}>Message</Text>
            <TextInput
              style={[styles.textarea, { backgroundColor: colors.card + 'CC', color: colors.text }]}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              placeholder="Tell me more about your project or request"
              placeholderTextColor={colors.muted}
            />

            <TouchableOpacity style={[styles.primaryBtn, styles.primaryBtnLift, { backgroundColor: colors.primary, marginTop: 14 }]} onPress={handleSend}>
              <Text style={[styles.primaryBtnText, { color: colors.card }]}>Send</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ContactIcon({ size = 64, fill = '#0ea5a4' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="3" width="20" height="14" rx="2" stroke={fill} strokeWidth="1.5" />
      <Path d="M3 7l9 6 9-6" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 18c1.5-1 3-1 5 0s3.5 1 5 0" stroke={fill} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 70,
  },
  header: {
    fontSize: 28,
    color: '#dc3545', // fallback
    fontWeight: 'bold',
    marginBottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  }
  ,
  form: {
    width: '92%',
    maxWidth: 800,
    alignItems: 'stretch',
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textarea: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 120,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '60%',
    borderRadius: 12,
    padding: 10,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)'
  },
  modalOptionText: {
    fontSize: 15,
  },
  logoWrap: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactList: {
    width: '92%',
    maxWidth: 800,
    marginTop: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  contactChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  contactChipText: {
    fontSize: 14,
  },
  headerBox: {
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  buttonsCenter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  primaryBtnText: {
    fontWeight: '700',
  }
  ,
  elevatedBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  primaryBtnLift: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  }
});
