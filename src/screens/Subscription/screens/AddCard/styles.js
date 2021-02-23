import { StyleSheet } from 'react-native';

// styles
import Colors from 'src/styles/colors';

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.whisper
  },
  input: {
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    borderColor: Colors.white
  },
  inputContainer: {
    borderBottomWidth: 0
  },
  button: {
    paddingHorizontal: 35,
    marginTop: 'auto',
    marginBottom: 20
  }
});
