import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

import { API_URL } from '../../constants/api';

export default function AddListingScreen() {
  const router = useRouter();
  const [listingType, setListingType] = useState<'sahiplendirme' | 'emanet'>('sahiplendirme');
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('Kedi');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Dişi');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!name || !breed || !city) {
      Alert.alert('Eksik Bilgi', 'Lütfen en azından isim, ırk ve şehir bilgilerini girin.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          breed,
          age,
          gender,
          city,
          listing_type: listingType === 'sahiplendirme' ? 'Sahiplendirme' : 'Emanet',
          description,
          owner_id: 1 // Default to user 1
        }),
      });

      if (response.ok) {
        Alert.alert('Harika Haber! ✨', 'İlanın yayına hazır. Dostumuzun şansı artık çok daha yüksek.', [
          { text: 'Süper', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Hata', 'İlan yayınlanırken bir sorun oluştu.');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      Alert.alert('Hata', 'Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Header Area */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Dostun İçin Bir İlan Ver 🐾</Text>
            <Text style={styles.headerSub}>Saniyeler içinde oluştur, en iyi yuvayı bul.</Text>
          </View>

          {/* Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              onPress={() => setListingType('sahiplendirme')}
              style={[styles.toggleBtn, listingType === 'sahiplendirme' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, listingType === 'sahiplendirme' && styles.toggleTextActive]}>
                Sahiplendirme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setListingType('emanet')}
              style={[styles.toggleBtn, listingType === 'emanet' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, listingType === 'emanet' && styles.toggleTextActive]}>
                Emanet Bakım
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Card 1: Basic Info */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="information-outline" size={20} color="#f97316" />
              <Text style={styles.cardTitle}>Temel Bilgiler</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Onun Adı Ne?</Text>
              <TextInput 
                placeholder="Örn: Zeytin" 
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Tür</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
                {['Kedi', 'Köpek', 'Kuş', 'Tavşan', 'Balık', 'Diğer'].map(t => (
                  <TouchableOpacity 
                    key={t}
                    onPress={() => setType(t)}
                    style={[styles.selectorBtn, type === t && styles.selectorBtnActive]}
                  >
                    <Text style={[styles.selectorText, type === t && styles.selectorTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Cinsiyet</Text>
                <View style={styles.genderContainer}>
                  {['Erkek', 'Dişi'].map(g => (
                    <TouchableOpacity 
                      key={g}
                      onPress={() => setGender(g)}
                      style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                    >
                      <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={styles.label}>Irk</Text>
                <TextInput 
                  placeholder="Tekir" 
                  placeholderTextColor="#94a3b8" 
                  style={styles.input}
                  value={breed}
                  onChangeText={setBreed}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Yaş</Text>
                <TextInput 
                  placeholder="Örn: 2 Yaş" 
                  placeholderTextColor="#94a3b8" 
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={styles.label}>Şehir</Text>
                <TextInput 
                  placeholder="Örn: İstanbul" 
                  placeholderTextColor="#94a3b8" 
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>

            {listingType === 'emanet' && (
              <View style={[styles.row, { marginTop: 10 }]}>
                <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>Başlangıç Tarihi</Text>
                  <View style={styles.inputWithIcon}>
                    <Feather name="calendar" size={16} color="#f97316" style={styles.inputIcon} />
                    <TextInput placeholder="GG.AA.YYYY" placeholderTextColor="#94a3b8" style={[styles.input, { paddingLeft: 40 }]} />
                  </View>
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.label}>Bitiş Tarihi</Text>
                  <View style={styles.inputWithIcon}>
                    <Feather name="calendar" size={16} color="#f97316" style={styles.inputIcon} />
                    <TextInput placeholder="GG.AA.YYYY" placeholderTextColor="#94a3b8" style={[styles.input, { paddingLeft: 40 }]} />
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Form Card 2: Photos */}
          <View style={[styles.card, { backgroundColor: '#FFF7ED' }]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="camera-outline" size={22} color="#f97316" />
              <Text style={styles.cardTitle}>Fotoğraflar</Text>
            </View>
            
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
              <View style={styles.uploadIcon}>
                <Feather name="plus" size={24} color="#f97316" />
              </View>
              <Text style={styles.uploadText}>Görsel Seç</Text>
              <Text style={styles.uploadLimit}>PDF veya JPEG (Maks. 5)</Text>
            </TouchableOpacity>
          </View>

          {/* Form Card 3: Story */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="pencil-box-outline" size={22} color="#f97316" />
              <Text style={styles.cardTitle}>Dostumuzun Hikayesi</Text>
            </View>
            <TextInput 
              placeholder="Kişiliği, alışkanlıkları ve özel ihtiyaçları hakkında biraz bilgi ver..." 
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity style={[styles.mainBtn, loading && { opacity: 0.7 }]} onPress={handleShare} activeOpacity={0.9} disabled={loading}>
            <Text style={styles.mainBtnText}>{loading ? 'Yayınlanıyor...' : 'İlanı Yayınla'}</Text>
            <View style={styles.btnIcon}>
              <Feather name="arrow-right" size={18} color="white" />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -1,
  },
  headerSub: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
    lineHeight: 22,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 6,
    borderRadius: 24,
    marginBottom: 25,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  toggleTextActive: {
    color: '#1a1a1a',
  },
  selectorScroll: {
    marginBottom: 10,
  },
  selectorBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectorBtnActive: {
    borderColor: '#f97316',
    backgroundColor: '#FFF7ED',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  selectorTextActive: {
    color: '#f97316',
  },
  genderContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 2,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#f97316',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  genderTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
  },
  uploadBox: {
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFEDD5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF7ED',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#f97316',
  },
  uploadLimit: {
    fontSize: 12,
    color: '#fb923c',
    marginTop: 4,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '600',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlignVertical: 'top',
  },
  mainBtn: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    paddingLeft: 24,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  mainBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  btnIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f97316',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
