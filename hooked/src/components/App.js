import React, { useReducer, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

const initialState = {
    allMovies: [],
    loading: true,
    movies: [],
    errorMessage: null,
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
      case 'SEARCH_MOVIES_SUCCESS':
        if (!state.allMovies.length > 0) {
            return {
                ...state,
                loading: false,
                allMovies: action.payload,
                movies: action.payload
            }
        }
        return {
            ...state,
            loading: false,
            movies: action.payload
        };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case 'RESET':
      return {
          ...state,
          loading: false,
          movies: [...state.allMovies]
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: data.Search
          });
        });
  }, []);

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(res => res.json())
        .then(data => {
          if (data.Response === 'True') {
            dispatch({
              type: 'SEARCH_MOVIES_SUCCESS',
              payload: data.Search
            });
          } else {
            dispatch({
              type: 'SEARCH_MOVIES_FAILURE',
              error: data.Error
            });
          }
        });
  };

  const reset = () => {
      dispatch({
          type: 'RESET'
      });
  };

  const { errorMessage, loading, movies } = state;
  return (
      <div className="App">
        <Header text="HOOKED" />
        <Search search={search} reset={reset} />
        <p className="App-intro">Sharing a few of our favorite movies</p>
        <div className="movies">
            {loading && !errorMessage ? (
                <span>loading... </span>
            ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
            ) : (
                movies.map((movie, index) => (
                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
                ))
            )}
        </div>
      </div>
  );
};

export default App;
