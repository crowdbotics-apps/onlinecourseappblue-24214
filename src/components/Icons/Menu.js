import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';

// components
import { Badge } from 'src/components';

// styles
import commonStyle from 'src/styles/common';

const Menu = ({ color, action, notifications }) => {
  const { headerIcons } = commonStyle;

  return (
    <TouchableOpacity style={styles.wrapper} onPress={action}>
      <Badge value={notifications.current} style={styles.badge} />
      <Icon
        type="MaterialIcons"
        name="menu"
        style={[headerIcons, commonStyle[`${color ? color : 'primary'}Icons`]]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    left: 12,
    zIndex: 1,
    bottom: 10,
    position: 'absolute'
  },
  wrapper: {
    position: 'relative'
  }
});

const mapStateToProps = state => ({
  notifications: state.app.notifications
});

export default connect(
  mapStateToProps,
  null
)(Menu);
