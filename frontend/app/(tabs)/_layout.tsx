import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';

const AnimatedLogo = () => {
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    scaleValue.value = withRepeat(
      withTiming(1.1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const animatedPawStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleValue.value },
      { rotate: '-12deg' }
    ],
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
      <Animated.View style={[
        { 
          backgroundColor: '#f97316', 
          width: 32, 
          height: 32, 
          borderRadius: 12, 
          alignItems: 'center', 
          justifyContent: 'center',
          shadowColor: '#f97316',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 3
        },
        animatedPawStyle
      ]}>
        <FontAwesome5 name="paw" size={16} color="white" />
      </Animated.View>
      <Text style={{ fontSize: 24, fontWeight: '900', color: '#0f172a', marginLeft: 12, letterSpacing: -0.8 }}>
        Pati<Text style={{ color: '#f97316' }}>Bak</Text>
      </Text>
    </View>
  );
};

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f97316', // orange-500
        tabBarInactiveTintColor: '#9ca3af', // gray-400
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          borderTopWidth: 0,
          paddingBottom: 25,
          paddingTop: 12,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9',
          height: 110, // Gives the modern header nice breathing room
        },
        headerTitle: '', // We will use headerLeft for the exact alignment
        headerLeft: () => (
          <View style={{ paddingLeft: 20 }}>
            <AnimatedLogo />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity 
            style={{ 
              marginRight: 20, 
              width: 44, 
              height: 44, 
              borderRadius: 22, 
              backgroundColor: '#f8fafc', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#f1f5f9'
            }}
            activeOpacity={0.6}
          >
            <Feather name="bell" size={20} color="#64748b" />
            <View style={{ 
              position: 'absolute', 
              top: 10, 
              right: 12, 
              width: 10, 
              height: 10, 
              backgroundColor: '#ef4444', 
              borderRadius: 5, 
              borderWidth: 2, 
              borderColor: '#f8fafc' 
            }} />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? "items-center justify-center bg-orange-50 w-12 h-12 rounded-full" : "items-center justify-center w-12 h-12 rounded-full"}>
               <Feather name="home" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'İlan Ver',
          tabBarIcon: ({ color, focused }) => (
             <View className={focused ? "items-center justify-center bg-orange-50 w-12 h-12 rounded-full" : "items-center justify-center w-12 h-12 rounded-full"}>
               <Feather name="plus-circle" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Mesajlar',
          tabBarIcon: ({ color, focused }) => (
             <View className={focused ? "items-center justify-center bg-orange-50 w-12 h-12 rounded-full" : "items-center justify-center w-12 h-12 rounded-full"}>
               <Feather name="message-square" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
             <View className={focused ? "items-center justify-center bg-orange-50 w-12 h-12 rounded-full" : "items-center justify-center w-12 h-12 rounded-full"}>
               <Feather name="user" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
