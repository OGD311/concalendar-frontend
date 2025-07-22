import * as SQLite from 'expo-sqlite';

export async function getDb() {
  return await SQLite.openDatabaseAsync("concalendar");
}