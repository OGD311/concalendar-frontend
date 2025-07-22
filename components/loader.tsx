import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={64} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
