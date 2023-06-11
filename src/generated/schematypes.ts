import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddCustomerInput = {
  amount: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type AddInventoryInput = {
  price: Scalars['Float']['input'];
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type AddSalesInput = {
  amount: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type Command = {
  __typename?: 'Command';
  command: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  amount: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type Inventory = {
  __typename?: 'Inventory';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomer?: Maybe<Customer>;
  addInventory?: Maybe<Inventory>;
  createSales?: Maybe<Sales>;
  updateCustomer?: Maybe<Customer>;
  updateInventory?: Maybe<Inventory>;
};


export type MutationAddCustomerArgs = {
  input: AddCustomerInput;
};


export type MutationAddInventoryArgs = {
  input: AddInventoryInput;
};


export type MutationCreateSalesArgs = {
  input: AddSalesInput;
};


export type MutationUpdateCustomerArgs = {
  id: Scalars['ID']['input'];
  request: AddCustomerInput;
};


export type MutationUpdateInventoryArgs = {
  id: Scalars['ID']['input'];
  request: AddInventoryInput;
};

export type Query = {
  __typename?: 'Query';
  customer?: Maybe<Customer>;
  customers?: Maybe<Array<Customer>>;
  inventories?: Maybe<Array<Inventory>>;
  inventory?: Maybe<Inventory>;
  sale?: Maybe<Sales>;
  searchCustomer?: Maybe<Array<Customer>>;
  searchInventory?: Maybe<Array<Inventory>>;
  searchSales?: Maybe<Array<Sales>>;
};


export type QueryCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInventoryArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySaleArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchCustomerArgs = {
  input: SearchCustomerInput;
};


export type QuerySearchInventoryArgs = {
  input: SearchInventoryInput;
};


export type QuerySearchSalesArgs = {
  input: SearchSalesInput;
};

export type Saga = {
  __typename?: 'Saga';
  currentChannel: Scalars['String']['output'];
  currentStep: Scalars['Int']['output'];
  steps: Array<Steps>;
};

export type Sales = {
  __typename?: 'Sales';
  amount: Scalars['Float']['output'];
  customer?: Maybe<Customer>;
  customerId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inventory?: Maybe<Inventory>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  saga?: Maybe<Saga>;
  status?: Maybe<Scalars['String']['output']>;
};

export type SearchCustomerInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInventoryInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SearchSalesInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type StepInfo = {
  __typename?: 'StepInfo';
  COMPENSATE?: Maybe<Command>;
  FORWARD: Command;
};

export type Steps = {
  __typename?: 'Steps';
  channel: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  stepInfo: StepInfo;
  stepStage: Scalars['String']['output'];
  stepStatus: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCustomerInput: AddCustomerInput;
  AddInventoryInput: AddInventoryInput;
  AddSalesInput: AddSalesInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Command: ResolverTypeWrapper<Command>;
  Customer: ResolverTypeWrapper<Customer>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Inventory: ResolverTypeWrapper<Inventory>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Saga: ResolverTypeWrapper<Saga>;
  Sales: ResolverTypeWrapper<Sales>;
  SearchCustomerInput: SearchCustomerInput;
  SearchInventoryInput: SearchInventoryInput;
  SearchSalesInput: SearchSalesInput;
  StepInfo: ResolverTypeWrapper<StepInfo>;
  Steps: ResolverTypeWrapper<Steps>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCustomerInput: AddCustomerInput;
  AddInventoryInput: AddInventoryInput;
  AddSalesInput: AddSalesInput;
  Boolean: Scalars['Boolean']['output'];
  Command: Command;
  Customer: Customer;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Inventory: Inventory;
  Mutation: {};
  Query: {};
  Saga: Saga;
  Sales: Sales;
  SearchCustomerInput: SearchCustomerInput;
  SearchInventoryInput: SearchInventoryInput;
  SearchSalesInput: SearchSalesInput;
  StepInfo: StepInfo;
  Steps: Steps;
  String: Scalars['String']['output'];
};

export type CommandResolvers<ContextType = any, ParentType extends ResolversParentTypes['Command'] = ResolversParentTypes['Command']> = {
  command?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inventory'] = ResolversParentTypes['Inventory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCustomer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<MutationAddCustomerArgs, 'input'>>;
  addInventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<MutationAddInventoryArgs, 'input'>>;
  createSales?: Resolver<Maybe<ResolversTypes['Sales']>, ParentType, ContextType, RequireFields<MutationCreateSalesArgs, 'input'>>;
  updateCustomer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'id' | 'request'>>;
  updateInventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<MutationUpdateInventoryArgs, 'id' | 'request'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCustomerArgs, 'id'>>;
  customers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
  inventories?: Resolver<Maybe<Array<ResolversTypes['Inventory']>>, ParentType, ContextType>;
  inventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<QueryInventoryArgs, 'id'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sales']>, ParentType, ContextType, RequireFields<QuerySaleArgs, 'id'>>;
  searchCustomer?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType, RequireFields<QuerySearchCustomerArgs, 'input'>>;
  searchInventory?: Resolver<Maybe<Array<ResolversTypes['Inventory']>>, ParentType, ContextType, RequireFields<QuerySearchInventoryArgs, 'input'>>;
  searchSales?: Resolver<Maybe<Array<ResolversTypes['Sales']>>, ParentType, ContextType, RequireFields<QuerySearchSalesArgs, 'input'>>;
};

export type SagaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Saga'] = ResolversParentTypes['Saga']> = {
  currentChannel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentStep?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['Steps']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sales'] = ResolversParentTypes['Sales']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  saga?: Resolver<Maybe<ResolversTypes['Saga']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['StepInfo'] = ResolversParentTypes['StepInfo']> = {
  COMPENSATE?: Resolver<Maybe<ResolversTypes['Command']>, ParentType, ContextType>;
  FORWARD?: Resolver<ResolversTypes['Command'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Steps'] = ResolversParentTypes['Steps']> = {
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepInfo?: Resolver<ResolversTypes['StepInfo'], ParentType, ContextType>;
  stepStage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Command?: CommandResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Inventory?: InventoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Saga?: SagaResolvers<ContextType>;
  Sales?: SalesResolvers<ContextType>;
  StepInfo?: StepInfoResolvers<ContextType>;
  Steps?: StepsResolvers<ContextType>;
};

