import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl,
  TextInput,
  StatusBar,
  ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { API_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [])
  );

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const userStr = await AsyncStorage.getItem('user');
      if (!userStr) {
        router.replace('/(auth)/login');
        return;
      }
      const user = JSON.parse(userStr);
      
      const response = await fetch(`${API_URL}/messages/${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setConversations(Array.isArray(data) ? data : Object.values(data));
    } catch (error) {
      console.error('Error fetching messages:', error);
      setErrorMsg(String(error));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const date = new Date(timeStr);
      const now = new Date();
      const isToday = date.getDate() === now.getDate() && 
                      date.getMonth() === now.getMonth() && 
                      date.getFullYear() === now.getFullYear();
                      
      if (isToday) {
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });
      }
    } catch {
      return timeStr;
    }
  };

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    return conversations.filter(conv => 
      conv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const renderMessageItem = ({ item, index }: { item: any; index: number }) => {
    const isUnread = item.unread > 0;
    const isLastItem = index === filteredConversations.length - 1;
    
    return (
      <React.Fragment>
        <TouchableOpacity 
          style={styles.chatRow} 
          activeOpacity={0.6}
          onPress={() => router.push(`/chat/${item.id}`)}
        >
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user || 'User')}&background=f97316&color=fff` }} 
              style={styles.avatar} 
            />
            {/* Online/Unread Dot indicator on Avatar */}
            <View style={[styles.statusIndicator, isUnread ? styles.statusUnread : styles.statusRead]} />
          </View>
          
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={[styles.userName, isUnread && styles.userNameUnread]} numberOfLines={1}>
                {item.user}
              </Text>
              <Text style={[styles.timeText, isUnread && styles.timeTextUnread]}>
                {formatTime(item.time)}
              </Text>
            </View>
            
            <View style={styles.chatFooter}>
              <View style={styles.messageContentWrap}>
                <Text style={[styles.messageText, isUnread && styles.messageTextUnread]} numberOfLines={2}>
                  {item.petName && item.petName !== 'Genel Sohbet' ? (
                    <Text style={styles.petTag}>[{item.petName}] </Text>
                  ) : null}
                  {item.lastMessage}
                </Text>
              </View>
              
              {isUnread && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{item.unread > 9 ? '9+' : item.unread}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {!isLastItem && <View style={styles.separator} />}
      </React.Fragment>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyWrap}>
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      );
    }

    if (errorMsg) {
      return (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconCircle}>
            <Feather name="wifi-off" size={40} color="#f97316" />
          </View>
          <Text style={styles.emptyTitle}>Bağlantı Hatası</Text>
          <Text style={styles.emptySub}>Mesajlarınızı şu an yükleyemiyoruz. Lütfen kontrol edip tekrar deneyin.</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={fetchMessages}>
            <Text style={styles.actionBtnText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (searchQuery.length > 0) {
      return (
        <View style={[styles.emptyWrap, { marginTop: 40 }]}>
          <Feather name="search" size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
          <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
          <Text style={styles.emptySub}>"{searchQuery}" aramasına uygun mesaj veya kişi bulunamadı.</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyWrap}>
        <View style={styles.emptyIconCircle}>
          <MaterialCommunityIcons name="message-text-outline" size={44} color="#f97316" />
        </View>
        <Text style={styles.emptyTitle}>Henüz Mesajınız Yok</Text>
        <Text style={styles.emptySub}>İlan sahipleriyle iletişime geçmeye başladığınızda mesajlarınız burada görünecek.</Text>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.actionBtnText}>İlanları Keşfet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      
      {/* Dynamic Header */}
      <View style={styles.headerArea}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Sohbetler</Text>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Feather name="edit" size={20} color="#f97316" />
          </TouchableOpacity>
        </View>
        
        {/* Modern Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#94a3b8" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Mesajlarda veya kişilerde ara..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        {filteredConversations.length > 0 ? (
          <View style={styles.cardGroup}>
            <FlatList
              data={filteredConversations}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              renderItem={renderMessageItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchMessages} tintColor="#f97316" />
              }
            />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listEmpty}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchMessages} tintColor="#f97316" />
            }
          >
            {renderEmptyState()}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', // iOS identical light gray background
  },
  headerArea: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 24, // Matched with grouped padding
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f1f5f9', // Continuity of gray background
  },
  cardGroup: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20, // Pure harmony with the profile UI symmetry!
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 40,
    flexShrink: 1, // Only take required space, up to max
  },
  listContent: {
    paddingBottom: 60, // padding for flatlist inside the float card
  },
  listEmpty: {
    flexGrow: 1,
    paddingTop: 40,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 84, // Start exactly after the avatar
  },
  chatRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#f1f5f9',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  statusUnread: {
    backgroundColor: '#10b981', // green for online/active unread
  },
  statusRead: {
    backgroundColor: '#cbd5e1', // gray for offline/read
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    paddingRight: 10,
  },
  userNameUnread: {
    fontWeight: '800',
    color: '#000000',
  },
  timeText: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '500',
  },
  timeTextUnread: {
    color: '#f97316',
    fontWeight: '700',
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageContentWrap: {
    flex: 1,
    marginRight: 12,
  },
  petTag: {
    color: '#f97316',
    fontWeight: '700',
  },
  messageText: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 20,
  },
  messageTextUnread: {
    color: '#334155',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: '#f97316',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  actionBtn: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  }
});
