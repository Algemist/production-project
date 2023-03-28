import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/authByUsername';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { AddNewCommentSchema } from 'features/addNewComment';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    // Async reducers
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComment?: ArticleDetailsCommentSchema;
    profile?: ProfileSchema;
    addNewComment?: AddNewCommentSchema;
    articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
