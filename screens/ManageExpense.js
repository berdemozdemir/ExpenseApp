import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import axios from "axios";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-contex";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function postExpense(expenseData) {
    await axios.post(
      "https://expensesfb-68c2d-default-rtdb.firebaseio.com/expenses.json",
      expenseData
    );
  }

  function deleteExpense(){
    return axios.delete(
      `https://expensesfb-68c2d-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
  }

  async function deleteExpenseHandler() {
    await deleteExpense(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  async function updateExpense(id, expenseData) {
    return axios.put(
      `https://expensesfb-68c2d-default-rtdb.firebaseio.com/expenses/${id}.json`,
      expenseData
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      updateExpense(editedExpenseId, expenseData);
    } else {
      postExpense(expenseData);
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submiButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={'#9b095c'}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#200364',
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#a281f0',
    alignItems: "center",
  },
});
