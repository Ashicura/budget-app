// double check imports at the end
import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import { useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext';

function App() {
    const [showAddBudgetModel, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModel, setShowAddExpenseModal] = useState(false)
    const [ViewExpensesModelBudgetId, setViewExpensesModelBudgetId] = useState()
    const [addExpenseModelBudgetId, setaddExpenseModalBudgetId] = useState()
    const { budgets, getBudgetExpenses } = useBudgets()


    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setaddExpenseModalBudgetId(budgetId)
    }

    return (
<>
    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto">Budgets</h1>
            <Button varient="primary" onClick={() => setShowAddBudgetModal(true)}>
                Add Budget
            </Button>
            <Button varient="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div
          style={{display:"grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap:"1rem",
          alignItems: "flex-start"}}
          >
            {budgets.map(budget => {
                const amount= getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                return (
                    <BudgetCard 
                        key={budget.id}
                        name={budget.name}
                        amount={amount}
                        max={budget.max}
                        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                        onViewExpensesClick={() => setViewExpensesModelBudgetId(budget.id)}
                    />
                )
            })}
                <UncategorizedBudgetCard 
                onAddExpenseClick={openAddExpenseModal} 
                onViewExpensesClick={() => 
                    setViewExpensesModelBudgetId(UNCATEGORIZED_BUDGET_ID)
                }
                /> 
                <TotalBudgetCard />  
            </div>
    </Container>
    <AddBudgetModal 
    show={showAddBudgetModel} 
    handleClose={() => setShowAddBudgetModal(false)}
    />
    <AddExpenseModal 
    show={showAddExpenseModel} 
    defaultBudgetId={addExpenseModelBudgetId}
    handleClose={() => setShowAddExpenseModal(false)}
    />
    <ViewExpensesModal 
    budgetId={ViewExpensesModelBudgetId} 
    defaultBudgetId={addExpenseModelBudgetId}
    handleClose={() => setViewExpensesModelBudgetId()}
    />

  </>  
    )
}

export default App