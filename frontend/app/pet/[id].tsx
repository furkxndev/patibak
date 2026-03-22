import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

import { API_URL } from '../../constants/api';

const MOCK_PET = {
  id: '1',
  name: 'Milo',
  type: 'Köpek',
  breed: 'Golden Retriever',
  age: '2 Yaş',
  gender: 'Erkek',
  city: 'İstanbul',
  listing_type: 'Emanet',
  image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=1000&fit=crop',
  description: 'Milo, hayat dolu ve son derece sadık bir Golden Retriever. Çocuklarla arası harikadır ve temel komutları bilir. Yeni yuvasında sevgi ve oyun bekliyor. Aşıları tamdır.',
  owner: {
    name: 'Furkan Coşkun',
    image: 'https://ui-avatars.com/api/?name=Furkan+C&background=f97316&color=fff',
    rating: 4.9
  }
};

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<any>(MOCK_PET);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  React.useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets/${id}`);
      const data = await response.json();
      if (data && data.name) {
        setPet(data);
      }
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>İlan bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Immersive Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.image }} style={styles.mainImage} resizeMode="cover" />
          
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favButton}>
              <Feather name="heart" size={22} color={isFavorite ? "#ef4444" : "white"} fill={isFavorite ? "#ef4444" : "transparent"} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Floating Info Card */}
        <View style={styles.infoCardWrapper}>
          <View style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed}</Text>
              </View>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{pet.listingType}</Text>
              </View>
            </View>
            
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#f97316" />
              <Text style={styles.locationText}>{pet.city}, Türkiye</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContent}>
          {/* Editorial Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cinsiyet</Text>
              <Text style={styles.statValue}>{pet.gender}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Yaş</Text>
              <Text style={styles.statValue}>{pet.age}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Tür</Text>
              <Text style={styles.statValue}>{pet.type}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hakkında</Text>
            <Text style={styles.descriptionText}>{pet.description}</Text>
          </View>

          {/* Care Period (Conditional) */}
          {pet.listingType === 'Emanet' && pet.startDate && (
            <View style={styles.dateSection}>
              <View style={styles.dateCard}>
                <View style={styles.dateHeader}>
                  <MaterialCommunityIcons name="calendar-clock" size={20} color="#f97316" />
                  <Text style={styles.dateTitle}>Emanet Dönemi</Text>
                </View>
                <View style={styles.dateRangeRow}>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Başlangıç</Text>
                    <Text style={styles.dateValue}>{pet.startDate}</Text>
                  </View>
                  <View style={styles.dateArrow}>
                    <Feather name="arrow-right" size={16} color="#94a3b8" />
                  </View>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Bitiş</Text>
                    <Text style={styles.dateValue}>{pet.endDate}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Owner Card */}
          <View style={styles.ownerSection}>
            <Image source={{ uri: pet.owner.image }} style={styles.ownerImage} />
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerLabel}>İlan Sahibi</Text>
              <Text style={styles.ownerName}>{pet.owner.name}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Feather name="star" size={14} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.ratingText}>{pet.owner.rating}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modern Fixed Bottom Bar */}
      <SafeAreaView style={styles.footer}>
        <View style={styles.footerContent}>
          <TouchableOpacity 
            style={styles.secondaryAction}
            onPress={() => router.push(`/chat/${pet.owner_id || pet.owner.id}`)}
          >
            <Feather name="message-square" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.primaryAction}
            onPress={() => Alert.alert('İletişim', `${pet.owner.name} ile iletişime geçiliyor...`)}
          >
            <Text style={styles.primaryActionText}>Dost Edin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 140,
  },
  imageContainer: {
    height: width * 1.3,
    width: width,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardWrapper: {
    alignItems: 'center',
    marginTop: -80,
    paddingHorizontal: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 35,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  petName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -1,
  },
  petBreed: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#fff7ed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagBadgeText: {
    color: '#f97316',
    fontWeight: '800',
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  locationText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '700',
    marginLeft: 6,
  },
  bodyContent: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  statItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 15,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 26,
    fontWeight: '500',
  },
  dateSection: {
    marginBottom: 40,
  },
  dateCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffedd5',
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f97316',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 15,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '800',
  },
  dateArrow: {
    paddingHorizontal: 15,
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 30,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  ownerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  ownerLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    marginTop: 2,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 4,
    color: '#1a1a1a',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  secondaryAction: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  primaryAction: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryActionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
