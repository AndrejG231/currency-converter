import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type ConversionResponse = {
  __typename?: "ConversionResponse"
  destination: Scalars["String"]
  source: Scalars["String"]
  value: Scalars["Float"]
}

export type Currency = {
  __typename?: "Currency"
  name: Scalars["String"]
  symbol: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  availableCurrencies: Array<Currency>
  convert: ConversionResponse
  statistics: StatisicsResponse
}

export type QueryConvertArgs = {
  amount: Scalars["Float"]
  destination: Scalars["String"]
  source: Scalars["String"]
}

export type StatisicsResponse = {
  __typename?: "StatisicsResponse"
  mostPopularDestination: Currency
  totalAmountConverted: Scalars["Float"]
  totalConversionsCount: Scalars["Int"]
}

export type AvailableCurrenciesQueryVariables = Exact<{ [key: string]: never }>

export type AvailableCurrenciesQuery = {
  __typename?: "Query"
  availableCurrencies: Array<{
    __typename?: "Currency"
    name: string
    symbol: string
  }>
}

export type ConvertQueryVariables = Exact<{
  amount: Scalars["Float"]
  destination: Scalars["String"]
  source: Scalars["String"]
}>

export type ConvertQuery = {
  __typename?: "Query"
  convert: {
    __typename?: "ConversionResponse"
    value: number
    source: string
    destination: string
  }
}

export type StatisticsQueryVariables = Exact<{ [key: string]: never }>

export type StatisticsQuery = {
  __typename?: "Query"
  statistics: {
    __typename?: "StatisicsResponse"
    totalAmountConverted: number
    totalConversionsCount: number
    mostPopularDestination: {
      __typename?: "Currency"
      symbol: string
      name: string
    }
  }
}

export const AvailableCurrenciesDocument = gql`
  query AvailableCurrencies {
    availableCurrencies {
      name
      symbol
    }
  }
`

/**
 * __useAvailableCurrenciesQuery__
 *
 * To run a query within a React component, call `useAvailableCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableCurrenciesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AvailableCurrenciesQuery,
    AvailableCurrenciesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    AvailableCurrenciesQuery,
    AvailableCurrenciesQueryVariables
  >(AvailableCurrenciesDocument, options)
}
export function useAvailableCurrenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AvailableCurrenciesQuery,
    AvailableCurrenciesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    AvailableCurrenciesQuery,
    AvailableCurrenciesQueryVariables
  >(AvailableCurrenciesDocument, options)
}
export type AvailableCurrenciesQueryHookResult = ReturnType<
  typeof useAvailableCurrenciesQuery
>
export type AvailableCurrenciesLazyQueryHookResult = ReturnType<
  typeof useAvailableCurrenciesLazyQuery
>
export type AvailableCurrenciesQueryResult = Apollo.QueryResult<
  AvailableCurrenciesQuery,
  AvailableCurrenciesQueryVariables
>
export const ConvertDocument = gql`
  query Convert($amount: Float!, $destination: String!, $source: String!) {
    convert(amount: $amount, destination: $destination, source: $source) {
      value
      source
      destination
    }
  }
`

/**
 * __useConvertQuery__
 *
 * To run a query within a React component, call `useConvertQuery` and pass it any options that fit your needs.
 * When your component renders, `useConvertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConvertQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *      destination: // value for 'destination'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useConvertQuery(
  baseOptions: Apollo.QueryHookOptions<ConvertQuery, ConvertQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ConvertQuery, ConvertQueryVariables>(
    ConvertDocument,
    options
  )
}
export function useConvertLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ConvertQuery, ConvertQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ConvertQuery, ConvertQueryVariables>(
    ConvertDocument,
    options
  )
}
export type ConvertQueryHookResult = ReturnType<typeof useConvertQuery>
export type ConvertLazyQueryHookResult = ReturnType<typeof useConvertLazyQuery>
export type ConvertQueryResult = Apollo.QueryResult<
  ConvertQuery,
  ConvertQueryVariables
>
export const StatisticsDocument = gql`
  query Statistics {
    statistics {
      mostPopularDestination {
        symbol
        name
      }
      totalAmountConverted
      totalConversionsCount
    }
  }
`

/**
 * __useStatisticsQuery__
 *
 * To run a query within a React component, call `useStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatisticsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    StatisticsQuery,
    StatisticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StatisticsQuery, StatisticsQueryVariables>(
    StatisticsDocument,
    options
  )
}
export function useStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StatisticsQuery,
    StatisticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<StatisticsQuery, StatisticsQueryVariables>(
    StatisticsDocument,
    options
  )
}
export type StatisticsQueryHookResult = ReturnType<typeof useStatisticsQuery>
export type StatisticsLazyQueryHookResult = ReturnType<
  typeof useStatisticsLazyQuery
>
export type StatisticsQueryResult = Apollo.QueryResult<
  StatisticsQuery,
  StatisticsQueryVariables
>
