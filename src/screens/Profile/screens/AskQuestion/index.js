import React from 'react';
import { connect } from 'react-redux';

// components
import { Image, StyleSheet } from 'react-native';
import { Content } from 'native-base';
import { Header, BackIcon, Input, Button } from 'src/components';

// styles
import colors from 'src/styles/colors';
import commonStyles from 'src/styles/common';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { askQuestion as askQuestionAction } from '../../redux/actions';

// utils
import validator from 'src/utils/validation';

const AskQuestion = props => {
    const {
        requestingQuestion,
        navigation: { goBack }
    } = props; props;

    const stateSchema = {
        email: { value: '', error: '' },
        message: { value: '', error: '' },
    };

    const validationStateSchema = {
        email: {
            required: true,
            validator: validator.email,
        },
        message: {
            required: true
        }
    };

    const { state, handleOnChange, disable } = useForm(
        stateSchema,
        validationStateSchema,
    );

    return (
        <>
            <Header
                color="primary"
                title="Ask a question"
                left={<BackIcon action={() => goBack()} />}
            />
            <Content style={styles.container} showsVerticalScrollIndicator={false}>
                <Image
                    style={commonStyles.logo}
                    source={require('../../../../assets/images/Elevate-biscay-text.png')}
                />
                <Input
                    value={state.message.value}
                    onChangeText={value => handleOnChange('message', value)}
                    placeholder="Enter your question here..."
                    multiline
                    style={styles.input}
                    error={state.message.error}
                />
                <Input
                    value={state.email.value}
                    onChangeText={value => handleOnChange('email', value)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    error={state.email.error}
                />
                <Button
                    text="SEND QUESTION"
                    color="primary"
                    disabled={disable}
                    loading={requestingQuestion}
                    onPress={() => props.askQuestion({
                        message: state.message.value,
                        email: state.email.value
                    })}
                    block
                    style={styles.button}
                />
            </Content>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        backgroundColor: colors.whisper
    },

    input: {
        marginBottom: 0
    },

    button: {
        marginVertical: 10,
        backgroundColor: colors.morningGlory
    },
});

const mapStateToProps = state => ({
    requestingQuestion: state.profile.requestingQuestion,
});

const mapDispatchToProps = dispatch => ({
    askQuestion: data => dispatch(askQuestionAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AskQuestion);
