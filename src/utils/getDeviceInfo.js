import { Platform } from 'react-native';
import { getDeviceId, getModel, getAndroidId } from 'react-native-device-info';

const getDeviceInfo = async (user, authToken) => {
    const androidId = await getAndroidId();
    const deviceData = {
        user,
        name: getModel(),
        active: true,
        cloud_message_type: 'FCM',
        authToken
    };
    if (Platform.OS === 'android') {
        deviceData.device_id = androidId;
    }
    return deviceData;
};

export default getDeviceInfo;
