import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';
import { Tabs } from "expo-router";

export default function TabLayout() {
    const handleTabPress = async () => {
        return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    
    return <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
            }}
            listeners={{
                tabPress: handleTabPress
            }}
        />

        <Tabs.Screen 
            name='bookmarks'
            options={{
                title: "Bookmarks",
                tabBarIcon: ({ color }) => <FontAwesome size={24} name='bookmark' color={color} />
            }}
            listeners={{
                tabPress: handleTabPress
            }}
        />

        <Tabs.Screen
            name="settings"
            options={{
                title: "Settings",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />
            }}
            listeners={{
                tabPress: handleTabPress
            }}
        />

        <Tabs.Screen
            name='[convention]'
            options={{
                href: null
            }}    
        />
    </Tabs>
}