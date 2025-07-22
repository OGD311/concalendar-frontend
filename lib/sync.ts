import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_HASH_KEY = "last_data_hash";

export async function remoteSync(): Promise<boolean> {

    const remoteHash = await fetchRemoteHash();

    const localHash = await AsyncStorage.getItem(LAST_HASH_KEY);

    if (remoteHash !== localHash) {
        AsyncStorage.setItem(LAST_HASH_KEY, remoteHash);
        return true;
    }

    return false;
    
}


async function fetchRemoteHash(): Promise<string> {
    const result = await fetch("http://192.168.0.52:8080/hash");
    const data = await result.json();
    return data.hash;
}
