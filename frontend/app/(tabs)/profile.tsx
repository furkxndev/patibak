import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  Alert
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../../constants/api';

const MOCK_USER = {
  id: 1,
  name: 'Furkan Coşkun',
  image: 'https://ui-avatars.com/api/?name=Furkan+Coskun&background=f97316&color=fff',
  city: 'İstanbul',
  rating: 4.8,
  listings_count: 12,
  reviews_count: 24
};

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(MOCK_USER);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userStr = await AsyncStorage.getItem('user');
      
      let userId = 1;
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        userId = parsedUser.id;
        
        setUser({
          ...MOCK_USER,
          name: parsedUser.name,
          email: parsedUser.email,
          image: parsedUser.image || MOCK_USER.image,
          city: parsedUser.city || MOCK_USER.city
        });
      }

      const response = await fetch(`${API_URL}/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.name) {
          setUser((prev: any) => ({ ...prev, ...data }));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Çıkış Yap", 
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  const handleMenuPress = (title: string) => {
    Alert.alert(title, `Bu bölüm yapım aşamasındadır: ${title}`);
  };

  const MENU_ITEMS = [
    { id: '1', title: 'İlanlarım', icon: 'grid', color: '#f97316' }, 
    { id: '2', title: 'Favorilerim', icon: 'heart', color: '#ec4899' },
    { id: '3', title: 'Ödemeler', icon: 'credit-card', color: '#3b82f6' },
  ];

  if (loading && !user.name) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header - Perfectly Centered */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.image }} 
              style={styles.avatar} 
            />
            <TouchableOpacity 
              style={styles.editAvatarBtn} 
              onPress={() => Alert.alert('Düzenle', 'Fotoğraf değiştirme yakında eklenecek.')}
              activeOpacity={0.8}
            >
              <Feather name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userLocation}>
            <Feather name="map-pin" size={12} color="#64748b" /> {user.city}, Türkiye
          </Text>
        </View>

        {/* Stats Block - Symmetrical Island */}
        <View style={styles.cardGroup}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.listings_count}</Text>
              <Text style={styles.statLabel}>İlanlar</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.rating}</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.reviews_count || 24}</Text>
              <Text style={styles.statLabel}>Yorumlar</Text>
            </View>
          </View>
        </View>

        {/* Menu Block - Inset Grouped */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hesabım</Text>
        </View>
        <View style={styles.cardGroup}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.menuRow}
                activeOpacity={0.6}
                onPress={() => handleMenuPress(item.title)}
              >
                <View style={[styles.menuIconBg, { backgroundColor: `${item.color}15` }]}>
                  <Feather name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
                <Feather name="chevron-right" size={20} color="#cbd5e1" />
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.rowDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Settings Block - Inset Grouped */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Diğer</Text>
        </View>
        <View style={styles.cardGroup}>
          <TouchableOpacity 
            style={styles.menuRow}
            activeOpacity={0.6}
            onPress={() => handleMenuPress('Ayarlar')}
          >
            <View style={[styles.menuIconBg, { backgroundColor: '#f1f5f9' }]}>
              <Feather name="settings" size={18} color="#64748b" />
            </View>
            <Text style={styles.menuText}>Ayarlar</Text>
            <Feather name="chevron-right" size={20} color="#cbd5e1" />
          </TouchableOpacity>
          <View style={styles.rowDivider} />
          
          <TouchableOpacity 
            style={styles.menuRow}
            activeOpacity={0.6}
            onPress={() => handleMenuPress('Güvenli PatiBak')}
          >
            <View style={[styles.menuIconBg, { backgroundColor: '#d1fae5' }]}>
              <MaterialCommunityIcons name="shield-check" size={18} color="#10b981" />
            </View>
            <Text style={styles.menuText}>PatiBak Onayı (Kimlik Doğrulama)</Text>
            <Feather name="chevron-right" size={20} color="#cbd5e1" />
          </TouchableOpacity>
        </View>

        {/* Logout Block */}
        <View style={[styles.cardGroup, { marginTop: 30, marginBottom: 20 }]}>
          <TouchableOpacity 
            style={styles.logoutRow}
            activeOpacity={0.6}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Hesaptan Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', // Light gray standard background
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f97316',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  userLocation: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '600',
  },
  cardGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#e2e8f0',
  },
  sectionHeader: {
    paddingHorizontal: 28,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 66, // Aligns divider with text, skips icon
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ef4444',
    marginLeft: 8,
  }
});
