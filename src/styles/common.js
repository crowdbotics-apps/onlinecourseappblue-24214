import { StyleSheet, Platform } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  authBgImage: {
    flex: 1,
    resizeMode: 'cover'
  },

  authContainer: {
    flex: 1,
    padding: 45,
    paddingTop: 0
  },

  logo: {
    height: 140,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        marginTop: 10,
        height: 125
      }
    })
  },

  headerIcons: {
    fontSize: 25,
    textAlign: 'center'
  },
  primaryIcons: { color: colors.white },
  secondaryIcons: { color: colors.doveGray },
  tertiary: { color: colors.biscay },

  container: {
    paddingHorizontal: 22,
    backgroundColor: colors.whisper
  },

  containerMain: {
    backgroundColor: colors.whisper
  },

  contentWrapper: {
    flex: 1,
    paddingHorizontal: 22
  },

  headingWrapper: {
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 25
  },

  catagoryHeading: {
    flex: 3
  },

  coursesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
