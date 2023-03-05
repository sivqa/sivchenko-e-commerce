import { remove } from 'lodash';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ToggleFavType = {
  id: string;
}

interface UserSliceTypes {
  user: any;
  favProducts: any;
}

const initialState = {
  favProducts: [],
} as UserSliceTypes

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if(!index) {
        state.favProducts.push(action.payload.id);

        return;
      }

      remove(state.favProducts, id => id === action.payload.id);
    }
  },
})

export const { toggleFavProduct } = userSlice.actions
export default userSlice.reducer