import { AsyncStorage } from 'react-native';

// tslint:disable: no-console

const get = async <T>(key: string): Promise<T[]> => {
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

const set = async <T>(key: string, value: T): Promise<void> => {
    try {
        AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(error);
    }
};

const remove = async (key: string): Promise<void> => {
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
        console.log(e);
    }
    return;
};

export const StorageService = {
    get,
    set,
    remove,
    getKeys,
};
