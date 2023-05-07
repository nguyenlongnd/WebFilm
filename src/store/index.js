import { configureStore } from "@reduxjs/toolkit"
import MoviesReducer from "./slices/moviesSlice"
import TvSeriesReducer from "./slices/tvSeriesSlice"
const store = configureStore({
    reducer: {
        movies: MoviesReducer,
        tvSeries: TvSeriesReducer
    }
})
export default store;