import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('bransontechnologies@outlook.com');

  const handleSsoLogin = () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid Corporate Email', 'Please provide a valid corporate email address.');
      return;
    }
    onLoginSuccess(email);
  };

  const handleBiometricLogin = () => {
    Alert.alert(
      'Biometric Authentication',
      'FaceID / Fingerprint recognized. Authenticating as Branson Allan (DTB Africa)...',
      [
        {
          text: 'Continue',
          onPress: () => onLoginSuccess(email),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Brand Banner */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoLetter}>K</Text>
          </View>
          <Text style={styles.brandTitle}>Kati CRM</Text>
          <View style={styles.orgTag}>
            <Text style={styles.orgTagText}>DIAMOND TRUST BANK AFRICA</Text>
          </View>
          <Text style={styles.brandSubtitle}>
            Next-Gen Enterprise Sales & Customer 360 Platform
          </Text>
        </View>

        {/* Login Card */}
        <View style={[styles.loginCard, Shadows.card]}>
          <Text style={styles.inputLabel}>CORPORATE EMAIL ADDRESS</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. user@dtbafrica.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Solid Magenta SSO Button (Matching PDF Screen 5.0) */}
          <TouchableOpacity
            style={styles.ssoButton}
            onPress={handleSsoLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.ssoButtonText}>Log In with SSO</Text>
          </TouchableOpacity>

          {/* Biometrics Alternative */}
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricLogin}
          >
            <Text style={styles.biometricIcon}>🛡️</Text>
            <Text style={styles.biometricText}>
              Sign in with FaceID / Biometrics
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security & Support Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Protected by DTB Africa Enterprise Zero-Trust Identity.
          </Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity
              onPress={() => Alert.alert('Privacy', 'DTB Africa Privacy Policy 2026')}
            >
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerBullet}>•</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Support', 'Helpdesk: ext. 8022 or helpdesk@dtbafrica.com')}
            >
              <Text style={styles.footerLink}>IT Support</Text>
            </TouchableOpacity>
            <Text style={styles.footerBullet}>•</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Security', 'TLS 1.3 / OAuth 2.0 Mutual Auth')}
            >
              <Text style={styles.footerLink}>Security</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Premium Navy dark theme matching Screen 5.0
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    elevation: 4,
  },
  logoLetter: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.textInverse,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  orgTag: {
    backgroundColor: 'rgba(235, 106, 0, 0.15)',
    borderColor: Colors.brandPrimary,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  orgTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.brandPrimary,
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.sm,
    height: 48,
    marginBottom: Spacing.md,
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  ssoButton: {
    height: 48,
    backgroundColor: '#D946EF', // Solid Magenta matching Screen 5.0 in PDF
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ssoButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginTop: Spacing.md,
    gap: 8,
  },
  biometricIcon: {
    fontSize: 16,
  },
  biometricText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  footerLink: {
    fontSize: 11,
    color: Colors.brandPrimary,
    fontWeight: '600',
  },
  footerBullet: {
    fontSize: 10,
    color: '#475569',
  },
});
