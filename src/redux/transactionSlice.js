import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(data) {
        return { 
          payload: { 
            ...data, 
            date: data.date ? new Date(data.date).toISOString() : null,
            id: nanoid(), 
            timestamp: new Date().toISOString() 
          } 
        };
      },
    },
    updateTransaction: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.findIndex(transaction => transaction.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    deleteTransaction: (state, action) => {
      return state.filter(transaction => transaction.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

// Selectors
export const selectAllTransactions = (state) => state.transactions;
export const selectTransactionsByMajdoorId = (state, majdoorId) => 
  state.transactions.filter(transaction => transaction.majdoorId === majdoorId);
export const selectTransactionsByType = (state, type) => 
  state.transactions.filter(transaction => transaction.type === type); 