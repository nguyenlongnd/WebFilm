import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import tmdpApi, { CATEGORY_DATA, MOVIE_TYPE } from "../../api/tmdp"

const initialState = {
    moviesTopRate: [],
    moviesPopular: [],
    moviesNowPlaying: [],
    moviesGenre: [],
    moviesUpcoming: [],
    isLoading: false,
    error: ""
}

const ASYNC_ACTION = {
    GET_MOVIES_POPULAR: "movies/popular",
    GET_MOVIES_TOP_RATE: "movies/topRate",
    GET_MOVIES_NOW_PLAYING: "movies/nowPlaying",
    GET_MOVIES_GENRE: "movies/genre",
    GET_MOVIES_UPCOMING: "movies/upcoming"
}

const getMoviesPopular = createAsyncThunk(ASYNC_ACTION.GET_MOVIES_POPULAR, async()=>{
    const {results} = await tmdpApi.getList(MOVIE_TYPE.popular, CATEGORY_DATA.movie);
    const fullResults = await getFullGenreOfMoives(results)
    return fullResults;
})

const getMoviesTopRate = createAsyncThunk(ASYNC_ACTION.GET_MOVIES_TOP_RATE, async () => {
    const {results}= await tmdpApi.getList( MOVIE_TYPE.topRate, CATEGORY_DATA.movie);
    const fullResults = await getFullGenreOfMoives(results)
    return fullResults ;
})

const getMoviesNowPlaying = createAsyncThunk(ASYNC_ACTION.GET_MOVIES_NOW_PLAYING, async () => {
    const {results} = await tmdpApi.getList( MOVIE_TYPE.nowPlaying, CATEGORY_DATA.movie);
    console.log("results", await tmdpApi.getList( MOVIE_TYPE.nowPlaying, CATEGORY_DATA.movie));
    const fullResults = await getFullGenreOfMoives(results)
    return fullResults ;
})

const getMoviesUpcoming = createAsyncThunk(ASYNC_ACTION.GET_MOVIES_UPCOMING, async () =>{
    const {results} = await tmdpApi.getList(MOVIE_TYPE.upComing, CATEGORY_DATA.movie);
    const fullResults = await getFullGenreOfMoives(results)
    return fullResults;
})

const getMoviesGenre = createAsyncThunk(ASYNC_ACTION.GET_MOVIES_GENRE, async ()=> {
    const res = await tmdpApi.getGenre(CATEGORY_DATA.movie);
    return res?.genre;
})
const getFullGenreOfMoives = async (results, params) => {
    const {genres} = await tmdpApi.getGenre(CATEGORY_DATA.movie, {params});
    if(results.length > 0 && genres.length >0){
        const fullMoviesGenre = results.map((movie,idx) => {
            let fullGenres = genres.filter((genre,idx) => (movie?.genre_ids).includes(genre.id));
            return {genres: fullGenres, ...movie}
        })
        return fullMoviesGenre
    }
}

const TopRateSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
        //GET MOVIES POPULAR
        .addCase(getMoviesPopular.fulfilled,(state,action) => {
            state.moviesPopular = action.payload
        })
        .addCase(getMoviesPopular.rejected, (state, action) => {
            state.error = action.error.message
        })

        //GET MOVIES TOP RATED
        .addCase(getMoviesTopRate.fulfilled,(state,action) => {
            state.moviesTopRate = action.payload
        })
        .addCase(getMoviesTopRate.rejected, (state, action) => {
            state.error = action.error.message
        })

        // GET MOVIE NOW PLAYING
        .addCase(getMoviesNowPlaying.fulfilled, (state, action) => {
            state.moviesNowPlaying = action.payload
        })
        .addCase(getMoviesNowPlaying.rejected, (state, action) => {
            state.error = action.error.message
        })

        //GET GENRES MOVIE
        .addCase(getMoviesGenre.fulfilled, (state, action) =>{
            state.error = action.error.message
        })
        .addCase(getMoviesGenre.rejected, (state, action) => {
            state.error = action.error.message
        })

        //GET MOVIES UPCOMING 
        .addCase(getMoviesUpcoming.fulfilled, (state, action) => {
            state.moviesUpcoming = action.payload
        })
        .addCase(getMoviesUpcoming.rejected, (state, action) => {
            state.error = action.error.message
        })

    }
})
export {getMoviesTopRate, getMoviesPopular,getMoviesNowPlaying,getMoviesUpcoming}
export default TopRateSlice.reducer
