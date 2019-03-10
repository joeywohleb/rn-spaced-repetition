import { AsyncStorage } from 'react-native';

// tslint:disable: no-console

type keys = 'decks';

const get = async <T>(key: keys): Promise<T[]> => {
    try {
        const value: string | null = await AsyncStorage.getItem(key);
        if (value != null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.warn(error);
    }
    return [];
};

const set = async (key: keys, value: any[]): Promise<void> => {
    try {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(error);
    }
};

const remove = async (key: keys): Promise<void> => {
    try {
        return AsyncStorage.removeItem(key);
    } catch (error) {
        console.warn(error);
    }
};

const getKeys = async (): Promise<string[] | undefined> => {
    try {
        return AsyncStorage.getAllKeys();
    } catch (e) {
        console.warn(e);
    }
    return;
};

export const StorageService = {
    get,
    set,
    remove,
    getKeys,
};
