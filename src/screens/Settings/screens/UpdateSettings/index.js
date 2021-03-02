import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Switch } from 'react-native';
import { Container, Content } from 'native-base';
import { RadioButton, Checkbox } from 'react-native-paper';

// components
import { Header, Text, BackIcon, Input, Button } from 'src/components';

// actions
import { updateSettings } from '../../redux/actions';

// constants
import { Industries, downloadQuality, videoQuality } from '../../constants';

// styles
import styles from './styles';
import commonStyle from '../../styles';
import colors from 'src/styles/colors';

const UpdateSettings = props => {
  const {
    user,
    settings,
    requestingUpdate,
    navigation: { goBack }
  } = props;

  const {
    id,
    suggest_class,
    industry,
    download_quality,
    video_quality
  } = settings;

  const [suggestClass, setSuggestClass] = useState(suggest_class);
  const [industryType, setIndustryType] = useState(industry);
  const [downloadType, setDownloadType] = useState(download_quality);
  const [videoType, setVideoType] = useState(video_quality);

  const updateData = () => {
    const data = {
      suggest_class: suggestClass,
      industry: industryType,
      download_quality: downloadType,
      video_quality: videoType
    };
    props.updateSettings(id, data);
  };

  return (
    <>
      <Header
        color="secondary"
        left={<BackIcon color="secondary" action={() => goBack()} />}
      />
      <Container
        style={[
          commonStyle.container,
          commonStyle.updateContainer,
          styles.container
        ]}>
        <Content showsVerticalScrollIndicator={false}>
          <Text
            text="Suggest Classes"
            category="h6"
            style={styles.heading}
            bold
          />
          <View style={styles.itemWrapper}>
            <Text
              text={suggestClass ? 'Yes' : 'No'}
              category="s1"
              style={styles.item}
            />
            <Switch
              trackColor={{ false: colors.doveGray, true: colors.doveGray }}
              thumbColor={suggestClass ? colors.morningGlory : colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => setSuggestClass(val)}
              value={suggestClass}
            />
          </View>
          <Text text="Industry" category="h6" style={styles.heading} bold />
          {Industries.map(item => {
            return (
              <View key={item.value} style={styles.itemWrapper}>
                <Text text={item.title} category="s1" style={styles.item} />
                <View style={styles.radioWrapper}>
                  <RadioButton
                    status={industryType === item.value ? 'checked' : 'unchecked'}
                    color={colors.morningGlory}
                    uncheckedColor={colors.doveGray}
                    onPress={() => setIndustryType(item.value)}
                  />
                </View>
                {/* <Checkbox.Item
                  style={{ marginRight: -16 }}
                  status={industry === item.value ? 'checked' : 'unchecked'}
                  color={colors.morningGlory}
                  uncheckedColor={colors.doveGray}
                  onPress={() => setIndustry(item.value)}
                /> */}
              </View>
            );
          })}
          {/* <Text
            text="Download Quality"
            category="h6"
            style={styles.heading}
            bold
          />
          {downloadQuality.map(item => {
            return (
              <View key={item.value} style={styles.itemWrapper}>
                <Text text={item.title} category="s1" style={styles.item} />
                <RadioButton
                  status={downloadType === item.value ? 'checked' : 'unchecked'}
                  color={colors.morningGlory}
                  uncheckedColor={colors.doveGray}
                  onPress={() => setDownloadType(item.value)}
                />
              </View>
            );
          })} */}
          <Text
            text="Video Quality"
            category="h6"
            style={styles.heading}
            bold
          />
          {videoQuality.map(item => {
            return (
              <View key={item.value} style={styles.itemWrapper}>
                <Text text={item.title} category="s1" style={styles.item} />
                <View style={styles.radioWrapper}>
                  <RadioButton
                    status={videoType === item.value ? 'checked' : 'unchecked'}
                    color={colors.morningGlory}
                    uncheckedColor={colors.doveGray}
                    onPress={() => setVideoType(item.value)}
                  />
                </View>
              </View>
            );
          })}
        </Content>
        <Button
          text="Update"
          color="primary"
          block
          onPress={updateData}
          style={styles.button}
          // disabled={!industryType && !videoType && !suggestClass}
          loading={requestingUpdate}
        />
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.app.user,
  settings: state.settings.settings,
  requestingUpdate: state.settings.requestingUpdate
});

const mapDispatchToProps = dispatch => ({
  updateSettings: (id, data) => dispatch(updateSettings(id, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSettings);