import { StyleSheet, Platform } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.whisper
  },
  updateContainer: {
    paddingHorizontal: 22
  },
  heading: {
    paddingVertical: 10
  },
  item: {
    flex: 1
  },
  itemWrapper: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginTop: 20
  },
  dataWrapper: {
    paddingVertical: 100
  },
  radioWrapper: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.black
      }
    })
  }
});
