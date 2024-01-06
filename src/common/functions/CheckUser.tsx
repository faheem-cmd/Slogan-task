import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserType = async (type: any) => {
  try {
    await AsyncStorage.setItem('userType', type);
  } catch (error) {
    console.error('Error setting user type to AsyncStorage:', error);
  }
};

export const getUserType = async () => {
  try {
    const storedUserType = await AsyncStorage.getItem('userType');
    return storedUserType;
  } catch (error) {
    console.error('Error getting user type from AsyncStorage:', error);
    return null;
  }
};
