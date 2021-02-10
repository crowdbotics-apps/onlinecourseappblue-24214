import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

// components
import { Text, Header, BackIcon, DataAvailability } from 'src/components';
import Saving from './screens/Saving';
import Overview from './screens/Overview';
import Housing from './screens/Housing';
import Transportation from './screens/Transportation';
import Grocery from './screens/Grocery';
import ChildCare from './screens/ChildCare';
import LifeHappens from './screens/LifeHappens';
import Restaurants from './screens/Restaurants';
import CreditCard from './screens/CreditCard';
import Electronics from './screens/Electronics';
// import Clothing from './screens/Clothing';
import PersonalCare from './screens/PersonalCare';
import HomeFurnishing from './screens/HomeFurnishing';
import Entertainment from './screens/Entertainment';

// actions
import {
    resetScreen,
    getAssignment,
    updateLedger as updateLedgerAction
} from './redux/actions';

// constants
import { assignmentTypeToFieldMapping } from 'src/utils/constants';

// styles
import styles from './styles';

const Assignments = props => {
    const {
        items,
        ledger,
        requesting,
        resetScreen,
        updateLedger,
        assignmentData,
        activeResultScreen,
        navigation: { navigate, goBack },
        route: {
            params: {
                courseId,
                courseTitle,
                setActiveTab,
                currentBalance,
                isLastAssignment,
                assignment: { id, title, min_range, max_range, inline, lesson }
            }
        }
    } = props;

    const [resultStatus, updateResultStatus] = useState(false);

    useEffect(() => {
        resetScreen();
        !inline && props.getAssignment(id);
    }, []);

    const onSubmit = (data, total, tab = false) => {
        if (isLastAssignment) {
            const type = assignmentData && assignmentData.description.type
                ? assignmentData.description.type
                : 'saving';
            let value = ledger[assignmentTypeToFieldMapping[type]];
            if (value) {
                const addedValue = currentBalance + Number(value);
                updateResultStatus(addedValue - total > 0);
            } else {
                updateResultStatus(currentBalance - total > 0);
            }
        }

        updateLedger(
            ledger,
            courseId,
            data,
            isLastAssignment,
            setActiveTab,
            tab
        );
    };

    const renderResultScreen = () => {
        return resultStatus ? (
            navigate('Success', { courseTitle, courseId })
        ) : (
            navigate('Failure', { courseId })
            );
    };

    const renderAssignment = () => {
        switch (assignmentData.description.type) {
            case 'overview':
                return (
                    <Overview
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total, tab) => onSubmit(data, total, tab)
                        }
                    />
                );
            case 'housing':
                return (
                    <Housing
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'transportation':
                return (
                    <Transportation
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'childcare':
                return (
                    <ChildCare
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'grocery':
                return (
                    <Grocery
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'life_happens':
                return (
                    <LifeHappens
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'credit_card':
                return (
                    <CreditCard
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'restaurant':
                return (
                    <Restaurants
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'electronic':
                return (
                    <Electronics
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            // case 'clothing':
            //     return (
            //         <Clothing
            //             items={items}
            //             lessonId={lesson[0]}
            //             updateLedger={
            //                 (data, total) => onSubmit(data, total)
            //             }
            //         />
            //     );
            case 'personalcare':
                return (
                    <PersonalCare
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'homefurnishing':
                return (
                    <HomeFurnishing
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            case 'entertainment':
                return (
                    <Entertainment
                        items={items}
                        lessonId={lesson[0]}
                        updateLedger={
                            (data, total) => onSubmit(data, total)
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header
                color="primary"
                left={<BackIcon action={() => goBack()} />}
                title={activeResultScreen ? 'Course Result' : title}
            />
            <DataAvailability
                requesting={requesting}
                hasData={Boolean(assignmentData || inline)}
                style={styles.contentWrapper}>
                {!activeResultScreen && (
                    <View style={styles.descriptionWrapper}>
                        {!inline && (
                            <Text
                                text={assignmentData && assignmentData.description.text}
                                category="p1"
                                center
                            />
                        )}
                        <View style={styles.rangeWrapper}>
                            <Text
                                text={min_range ? 'Suggested Range:' : null}
                                category="p1"
                            />
                            <Text
                                text={min_range ? `${min_range}% - ${max_range}%` : null}
                                style={styles.rangeText}
                                category="s2"
                            />
                        </View>
                    </View>
                )}
                {inline ? (
                    activeResultScreen ? (
                        renderResultScreen()
                    ) : (
                            <Saving
                                min_range={min_range}
                                max_range={max_range}
                                ledger={ledger}
                                lessonId={lesson[0]}
                                updateLedger={
                                    (data, total) => onSubmit(data, total)
                                }
                            />
                        )
                ) : assignmentData ? (
                    activeResultScreen ? (
                        renderResultScreen()
                    ) : (
                            renderAssignment()
                        )
                ) : null}
            </DataAvailability>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    ledger: state.module.ledger,
    items: state.assignments.items,
    requesting: state.assignments.requesting,
    assignmentData: state.assignments.assignment,
    activeResultScreen: state.assignments.activeResultScreen
});

const mapDispatchToProps = dispatch => ({
    resetScreen: () => dispatch(resetScreen()),
    getAssignment: id => dispatch(getAssignment(id)),
    updateLedger: (ledger, courseId, data, isLast, callback, tab) =>
        dispatch(updateLedgerAction(ledger, courseId, data, isLast, callback, tab))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Assignments);
