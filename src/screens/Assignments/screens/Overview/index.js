import React from 'react';
import { connect } from 'react-redux';
import PDFView from 'react-native-view-pdf';

// components
import { Container } from 'native-base';
import { Button } from 'src/components';
import { View, Image } from 'react-native';

// styles
import styles from './styles';
import commonStyles from '../../styles';

const Overview = props => {
    const { items, lessonId, submitRequesting } = props;

    const onSubmit = () => {
        props.updateLedger({ lesson: lessonId }, 0, 2);
    };

    return (
        <Container style={styles.container}>
            {items.image ?
                <Image
                    style={styles.image}
                    source={{ uri: items.image }}
                />
                :
                <PDFView
                    fadeInDuration={250.0}
                    style={styles.pdf}
                    resource={items.file}
                    resourceType='url'
                />
            }
            <View style={commonStyles.button}>
                <Button
                    disabled={submitRequesting}
                    loading={submitRequesting}
                    onPress={() => onSubmit()}
                    text="Go to Lessons"
                    color="primary"
                    block
                />
            </View>
        </Container>
    );
};

const mapStateToProps = state => ({
    submitRequesting: state.assignments.submitRequesting
});

export default connect(
    mapStateToProps,
    null
)(Overview);
