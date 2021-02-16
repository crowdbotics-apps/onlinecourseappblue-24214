import AsyncStorage from '@react-native-community/async-storage';

export const loadState = async () => {
    const serializedState = await AsyncStorage.getItem('app');
    if (serializedState === null) {
        return undefined;
    }
    return JSON.parse(JSON.parse(serializedState));
};

export const saveState = state => {
    const serializedState = JSON.stringify({ app: state.app });
    AsyncStorage.setItem('app', JSON.stringify(serializedState));
};
