import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  ScrollView,
  TextInput
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - CARD_GAP) / 2;

const CAT_GAP = 10;
const CAT_WIDTH = (width - (HORIZONTAL_PADDING * 2) - (CAT_GAP * 2)) / 3;

import { API_URL } from '../../constants/api';

const MOCK_PETS = [
  {
    id: '1',
    name: 'Pamuk',
    breed: 'Van Kedisi',
    city: 'İstanbul',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=600&fit=crop',
    type: 'Kedi',
    color: '#FFF8E1'
  },
  {
    id: '2',
    name: 'Zeytin',
    breed: 'Dachshund',
    city: 'Ankara',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop',
    type: 'Köpek',
    listing_type: 'Emanet',
    color: '#E8F5E9'
  }
];

const CATEGORIES = [
  { id: '1', name: 'Hepsi', icon: 'paw' },
  { id: '2', name: 'Kedi', icon: 'cat' },
  { id: '3', name: 'Köpek', icon: 'dog' },
  { id: '4', name: 'Kuş', icon: 'bird' },
  { id: '5', name: 'Tavşan', icon: 'rabbit' },
  { id: '6', name: 'Balık', icon: 'fish' },
  { id: '7', name: 'Diğer', icon: 'turtle' },
];

export default function DiscoverScreen() {
  const [activeCategory, setActiveCategory] = useState('Hepsi');
  const [pets, setPets] = useState<any[]>(MOCK_PETS);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets`);
      const data = await response.json();
      if (data && data.length > 0) {
        setPets(data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
      // Keep MOCK_PETS on error
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = activeCategory === 'Hepsi' 
    ? pets 
    : pets.filter(pet => pet.type === activeCategory);

  const renderPetCard = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: item.color, marginTop: index % 2 === 0 ? 0 : 20 }]}
      onPress={() => router.push(`/pet/${item.id}`)}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.cardFav} activeOpacity={0.7}>
          <Feather name="heart" size={15} color="#f97316" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.petName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.petBreed} numberOfLines={1}>{item.breed}</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={10} color="#94a3b8" />
          <Text style={styles.locationText} numberOfLines={1}>{item.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={filteredPets}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPetCard}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Merhaba Furkan,</Text>
                <Text style={styles.mainTitle}>Dostunu Bul 🐾</Text>
              </View>
              <TouchableOpacity style={styles.searchBtn}>
                <Feather name="search" size={22} color="#1a1a1a" />
              </TouchableOpacity>
            </View>

            <View style={styles.categorySection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                {CATEGORIES.map(cat => (
                  <TouchableOpacity 
                    key={cat.id} 
                    onPress={() => setActiveCategory(cat.name)}
                    style={[styles.catBubble, activeCategory === cat.name && styles.catBubbleActive]}
                  >
                    <MaterialCommunityIcons 
                      name={cat.icon as any} 
                      size={20} 
                      color={activeCategory === cat.name ? '#f97316' : '#94a3b8'} 
                    />
                    <Text style={[styles.catLabel, activeCategory === cat.name && styles.catLabelActive]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>Yeni İlanlar</Text>
              <TouchableOpacity>
                <Text style={styles.viewMore}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 15,
    color: '#94a3b8',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1a1a1a',
    marginTop: 4,
    letterSpacing: -0.8,
  },
  searchBtn: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categorySection: {
    marginBottom: 30,
    marginTop: -5,
    marginHorizontal: -HORIZONTAL_PADDING,
  },
  categoryScroll: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 10,
  },
  catBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    width: CAT_WIDTH,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: CAT_GAP,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  catBubbleActive: {
    backgroundColor: '#ffffff',
    borderColor: '#f97316',
    borderWidth: 2,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 8,
  },
  catLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginLeft: 8,
  },
  catLabelActive: {
    color: '#1a1a1a',
    fontWeight: '800',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  viewMore: {
    fontSize: 14,
    color: '#f97316',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 110,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 32,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 20,
  },
  cardImageContainer: {
    height: CARD_WIDTH * 1.15,
    width: '100%',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardFav: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  petName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  petBreed: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    opacity: 0.7,
  },
  locationText: {
    fontSize: 10,
    color: '#94a3b8',
    marginLeft: 4,
    fontWeight: '700',
  }
});


