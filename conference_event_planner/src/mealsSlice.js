// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: 'Breakfast', cost: 50, selected: false },
  { name: 'High Tea', cost: 25, selected: false },
  { name: 'Lunch', cost: 65, selected: false },
  { name: 'Dinner', cost: 70, selected: false },
]

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toggleMealSelection: (state, action) => {
      const { payload: index } = action
      state[index].selected = !state[index].selected
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
