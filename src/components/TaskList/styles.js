import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },

  task: {
    color: '#131313',
    fontSize: 17,
    paddingLeft: 8,
    paddingRight: 20
  }
});