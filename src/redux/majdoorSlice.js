import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const majdoorSlice = createSlice({
  name: 'majdoors',
  initialState,
  reducers: {
    addMajdoor: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(data) {
        return { 
          payload: { 
            ...data, 
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
            id: nanoid(),
            createdAt: new Date().toISOString(),
            totalEarned: 0,
            totalTaken: 0,
            netBalance: 0
          } 
        };
      },
    },
    updateMajdoor: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.findIndex(majdoor => majdoor.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    deleteMajdoor: (state, action) => {
      return state.filter(majdoor => majdoor.id !== action.payload);
    },
    updateMajdoorBalance: (state, action) => {
      const { majdoorId, amount, type } = action.payload;
      const majdoor = state.find(m => m.id === majdoorId);
      if (majdoor) {
        if (type === 'earning') {
          majdoor.totalEarned += amount;
        } else if (type === 'lending') {
          majdoor.totalTaken += amount;
        }
        majdoor.netBalance = majdoor.totalEarned - majdoor.totalTaken;
      }
    },
  },
});

export const { addMajdoor, updateMajdoor, deleteMajdoor, updateMajdoorBalance } = majdoorSlice.actions;
export default majdoorSlice.reducer;

// Selectors
export const selectAllMajdoors = (state) => state.majdoors;
export const selectMajdoorById = (state, id) => state.majdoors.find(majdoor => majdoor.id === id); 