import React, { useState } from 'react';

// components
import Video from 'react-native-video';
import { View, ActivityIndicator } from 'react-native';

// styles
import styles from './styles';
import colors from 'src/styles/colors';

const VideoPlayer = ({ media, action }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={styles.videoWrapper}>
            <Video
                onLoad={() => setIsLoading(false)}
                onLoadStart={() => setIsLoading(true)}
                onEnd={action}
                source={{ uri: media }}
                resizeMode="contain"
                style={styles.video}
                controls
            />
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color={colors.biscay}
                    style={styles.loader}
                />
            )}
        </View>
    );
}

export default VideoPlayer;
