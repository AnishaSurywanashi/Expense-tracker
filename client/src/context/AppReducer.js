// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'GET_BUDGETS':
      return {
        ...state,
        budgets: action.payload,
        budgetLoading: false
      }
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets.filter(b => b._id !== action.payload._id), action.payload]
      }
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b._id !== action.payload)
      }
    case 'BUDGET_ERROR':
      return {
        ...state,
        budgetLoading: false,
        error: action.payload
      }
    case 'GET_STATS':
      return {
        ...state,
        stats: action.payload,
        statsLoading: false
      }
    case 'STATS_ERROR':
      return {
        ...state,
        statsLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}