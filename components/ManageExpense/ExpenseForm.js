import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, submiButtonLabel }) {

  const [amountValue, setAmountValue] = useState();
  const [dateValue, setDateValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  function amountChangeHandler(e) {
    setAmountValue(e);
  }

  function dateChangeHandler(e) {
    setDateValue(e);
  }
  function descriptionChangeHandler(e) {
    setDescriptionValue(e);
  }

  function submitHandler() {
    const expenseData = {
      amount: +amountValue,
      date: new Date(dateValue.date),
      description: descriptionValue,
    };
 
    onSubmit(expenseData)
  }

  return (
    <View>
      <Text style={styles.text}>YOUR EXPENSE</Text>
      <Input
        label="Amount"
        textInputConfig={{
          keyboradType: "decimal-pad",
          onChangeText: amountChangeHandler,
          value: amountValue,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: dateChangeHandler,
          value: dateValue,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: descriptionChangeHandler,
          value: descriptionValue,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submiButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
