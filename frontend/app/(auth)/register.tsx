import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { API_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !city) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, city }),
      });

      const data = await response.json();

      if (response.ok) {
        // Automatically login after registration
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        
        Alert.alert('Başarılı! 🎉', 'Hesabınız başarıyla oluşturuldu. Hoş geldiniz!', [
          { text: 'Başla', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Kayıt Başarısız', data.msg || 'Bir hata oluştu.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Hata', 'Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>🐾</Text>
            </View>
            <Text style={styles.brandTitle}>Aramıza Katıl</Text>
            <Text style={styles.subtitle}>PatiBak ile hayvan dostlarımıza yardımcı olun.</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ad Soyad</Text>
              <TextInput 
                value={name}
                onChangeText={setName}
                placeholder="Örn: Ahmet Yılmaz"
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-posta</Text>
              <TextInput 
                value={email}
                onChangeText={setEmail}
                placeholder="E-posta adresinizi girin"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifre</Text>
              <TextInput 
                value={password}
                onChangeText={setPassword}
                placeholder="Güçlü bir şifre belirleyin"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şehir</Text>
              <TextInput 
                value={city}
                onChangeText={setCity}
                placeholder="Örn: İstanbul"
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity 
              onPress={handleRegister}
              disabled={loading}
              style={[styles.registerBtn, loading && styles.registerBtnDisabled]}
            >
              <Text style={styles.registerBtnText}>{loading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten hesabınız var mı? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>Giriş Yap</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed', // orange-50
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#f97316', // orange-500
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  subtitle: {
    color: '#6b7280', // gray-500
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#374151', // gray-700
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7aa', // orange-200
    color: '#1f2937',
    fontSize: 16,
  },
  registerBtn: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  registerBtnDisabled: {
    opacity: 0.7,
  },
  registerBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#4b5563', // gray-600
    fontSize: 15,
  },
  loginText: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
