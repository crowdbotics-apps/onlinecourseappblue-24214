import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

// components
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

// styles
import colors from 'src/styles/colors';

const CELL_COUNT = 4;

const CodeVerificationInput2 = ({ onFulfill }) => {
    const [code, setValue] = useState('');
    const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
    const [layoutHandler, getCellOnLayoutHandler] = useClearByFocusCell({ code, setValue });

    useEffect(() => {
        code.length === 4 && onFulfill(code);
    }, [code]);

    return (
        <CodeField
            ref={ref}
            {...layoutHandler}
            value={code}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                >
                    {symbol || (isFocused ? <Cursor cursorSymbol="|" /> : null)}
                </Text>
            )}
        />
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 46,
        fontSize: 28,
        borderRadius: 3,
        backgroundColor: colors.white,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: colors.white,
    }
});

export default CodeVerificationInput2;
