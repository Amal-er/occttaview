import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userReducer from '../Slice/authSlice';
import { useDispatch, TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAddNewUserReducer } from './userSlice';
import { getAddNewFundReducer } from './userSlice';
import { addFundHistoryReducer } from './packageSlice';
import { userProfileReducer } from './userSlice';
import { addchangePasswordreducer } from './userSlice';
import { addchangeTransactionPasswordreducer } from './userSlice';
import { getAllUsersReducer } from './userSlice';
import { directIncomeReducer } from './userSlice';
import { levelIncomeReducer1 } from './userSlice';
import { levelIncomeReducer2 } from './userSlice';
import { levelIncomeReducer3 } from './userSlice';
import { getWithdrawFundreducer } from './userSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    userReducer,
    getAddNewUserReducer,
    getAddNewFundReducer,
    addFundHistoryReducer,
    userProfileReducer,
    addchangePasswordreducer,
    addchangeTransactionPasswordreducer,
    getAllUsersReducer,
    directIncomeReducer,
    levelIncomeReducer1,
    levelIncomeReducer2,
    levelIncomeReducer3,
    getWithdrawFundreducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
