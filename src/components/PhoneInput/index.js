import React, { Component } from 'react';

// components
import { StyleSheet, Platform } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import Error from 'src/components/Error';

// styles
import colors from 'src/styles/colors';

class PhoneField extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <>
                <PhoneInput
                    ref={ref => {
                        this.phone = ref;
                    }}
                    initialCountry={this.props.countryCode || 'us'}
                    value={this.props.value}
                    allowZeroAfterCountryCode={false}
                    textProps={{ placeholder: 'Phone Number' }}
                    style={styles.container}
                    textStyle={styles.text}
                    onChangePhoneNumber={val =>
                        this.props.onChangeText(
                            'phoneNumber',
                            val,
                            this.phone.getISOCode(),
                            this.phone.getCountryCode()
                        )
                    }
                    onSelectCountry={() =>
                        this.props.onChangeText(
                            'phoneNumber',
                            this.props.value,
                            this.phone.getISOCode(),
                            this.phone.getCountryCode()
                        )
                    }
                />
                <Error errors={this.props.error} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 46,
        paddingHorizontal: 16,
        borderColor: colors.white,
        borderRadius: 3,
        marginTop: 10
    },
    text: {
        color: colors.black,
        // fontFamily: 'Gilroy-ExtraBold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold',
            },
        }),
        fontSize: 13
    }
});

export default PhoneField;
