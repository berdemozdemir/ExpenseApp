import { useContext } from "react"

import { ExpensesContext } from "../store/expenses-contex"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext)
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="Kayıtlı bir harcama bulunamadı..!"/>
}

export default AllExpenses