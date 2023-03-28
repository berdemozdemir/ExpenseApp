import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-contex";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      const response = await axios.get(
        "https://expensesfb-68c2d-default-rtdb.firebaseio.com/expenses.json"
      );

      const expenses = [];

      for (const key in response.data) {
        const expenseObject = {
          id: key,
          amount: response.data[key].amount,
          date: new Date(response.data[key].date),
          description: response.data[key].description,
        };
        expenses.push(expenseObject);
      }
      expensesCtx.setExpenses(expenses);
      return expenses;
      
    }
    fetchExpenses();
  }, []);

  function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="Son 7 gün içinde kayıtlı bir harcama bulunamadı..!"
    />
  );
}

export default RecentExpenses;
