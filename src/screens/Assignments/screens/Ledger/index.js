import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { Text } from 'src/components';

// styles
import styles from './styles';

// constants
import { keyNameMapping } from 'src/utils/constants';

const Ledger = props => {
    const { ledger, assignmentTypes } = props;
    const [ledgerData, setLedgerData] = useState(false);

    useEffect(() => {
        if (ledger) {
            let data = [[
                'Net HouseHold income',
                null,
                `$${Number(ledger.initial_balance).toFixed(0)}`
            ]];
            let balance = ledger.initial_balance;
            keyNameMapping
            .filter(obj => assignmentTypes.includes(obj.type))
            .map(obj => {
                const cost = ledger[obj.key];
                const e = [
                    obj.name,
                    cost > 0 ? `$${Number(cost).toFixed(0)}` : '$0',
                    cost && `$${balance - cost}`
                ];
                balance = Number(balance - cost).toFixed(0);
                data.push(e);
            });
            setLedgerData(data);
        }
    }, [ledger]);

    return (
        <View style={styles.contentWrapper}>
            <Text
                text="FINANCIAL FLIGHT PLAN"
                color="primary"
                category="h5"
                style={styles.heading}
                bold
                center
            />
            <Table borderStyle={styles.table}>
                <Row
                    data={['Description', 'Cost', 'Balance']}
                    flexArr={[2, 1, 1]}
                    style={styles.head}
                    textStyle={styles.tableHeadText}
                />
                <TableWrapper style={styles.wrapper}>
                    {ledgerData ? (
                        <Rows
                            data={ledgerData}
                            flexArr={[2, 1, 1]}
                            textStyle={styles.text}
                        />
                    ) : (
                            <></>
                        )}
                </TableWrapper>
            </Table>
        </View>
    );
};

export default Ledger;
