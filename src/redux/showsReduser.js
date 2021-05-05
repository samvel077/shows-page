import * as actionTypes from "./showsActionTypes";

const initState = {
  loading: false,
  successMessage: null,
  error: null,
  shows: [],
  genres: [],
};

const showsReduser = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FAILURE: {
      return {
        ...state,
        loading: false,
        error: "Somthing wrong",
      };
    }

    case actionTypes.GET_SHOWS_SUCCESS: {
      let genresArr = [];

      const getGenresArr = action.payload.map((item) => item.show.genres);
      for (let value of getGenresArr) {
        genresArr.push(...value);
      }
      genresArr = [...new Set(genresArr)];

      let genres = [];
      for (let i of genresArr.sort()) {
        genres.push({ name: i, collapsed: "hide" });
      }

      action.payload.map((item) => (item.star = false));

      return {
        ...state,
        loading: false,
        successMessage: null,
        error: null,
        shows: action.payload,
        genres: genres,
      };
    }

    case actionTypes.COLLAPSE: {
      let collapsedGenres = [...state.genres];
      if (collapsedGenres.length >= 1) {
        let genresIndex = collapsedGenres.findIndex(
          (item) => item.name === action.payload.type
        );
        collapsedGenres[genresIndex].collapsed = action.payload.toggleCollapse;
      }

      return {
        ...state,
        genres: collapsedGenres,
        loading: false,
      };
    }

    case actionTypes.STAR_CHANGER: {
      const newShows = [...state.shows];

      if (newShows.length > 0) {
        let showIndex = newShows.findIndex(
          (item) => item.show.name === action.payload
        );
        newShows[showIndex].star = !newShows[showIndex].star;
      }

      return {
        ...state,
        shows: newShows,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default showsReduser;

// let pattern = /(<([^>]+)>)/gi;
