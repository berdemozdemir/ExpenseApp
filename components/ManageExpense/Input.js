import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({ label, textInputConfig }) {

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#c6affc',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#c6affc',
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: '#2d0689',
  },

});
