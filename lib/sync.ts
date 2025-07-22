import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertConvention } from './dbFunctions';

const LAST_HASH_KEY = "last_data_hash";
const LAST_DATE_KEY = "last_data_fetched_timestamp"

export async function remoteSync(): Promise<boolean> {
    console.log("Syncing...")
    AsyncStorage.setItem(LAST_HASH_KEY, "");

    const remoteHash = await fetchRemoteHash();
    const localHash = await AsyncStorage.getItem(LAST_HASH_KEY);

    const lastUpdateTimestampRaw = await AsyncStorage.getItem(LAST_DATE_KEY);
    const lastUpdateTimestamp = lastUpdateTimestampRaw === null
     // If no data (first time) then fetch all convention data from past 2 months
        ? new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
        : lastUpdateTimestampRaw;

    if (remoteHash !== localHash) {
        AsyncStorage.setItem(LAST_HASH_KEY, remoteHash);
        AsyncStorage.setItem(LAST_DATE_KEY, new Date().toISOString());

        await fetchRemoteData(lastUpdateTimestamp);
        return true;
    }

    return false;
    
}

const API_URL = "http://192.168.0.131/"

async function fetchRemoteHash(): Promise<string> {
    const result = await fetch(API_URL + "hash");
    const data = await result.json();
    return data.hash;
}

async function fetchRemoteData(timestamp: string) {
    console.log(timestamp)
    const result = await fetch(API_URL + "conventions/" + timestamp);
    const data = await result.json();
    const conventions = data.data;
    
    if (Array.isArray(conventions)) {
        for (const convention of conventions) {
            await insertConvention({ convention });
        }
    } else {
        console.log(conventions);
    }
}