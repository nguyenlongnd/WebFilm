import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import tmdpApi, { CATEGORY_DATA, TV_TYPE } from "../../api/tmdp"

const initialState = {
    tvSeriesTopRate: [],
    tvSeriesPopular: [],
    tvSeriesOnTheAir:[],
    isLoading: false,
    error: ""
}

const ASYNC_ACTION = {
    GET_TV_SERIES_POPULAR : "TvSeries/popular",
    GET_TV_SERIES_TOP_RATE : "TvSeries/topRate",
    GET_TV_SERIES_ON_THE_AIR : "TvSeries/onTheAir",
} 

const getTvSeriesPopular = createAsyncThunk(ASYNC_ACTION.GET_TV_SERIES_POPULAR, async (params) => {
    const res = await tmdpApi.getList( TV_TYPE.popular, CATEGORY_DATA.tv, {params});
    return res?.results ;
})

const getTvSeriesTopRate = createAsyncThunk(ASYNC_ACTION.GET_TV_SERIES_TOP_RATE, async () => {
    const params = {}
    const res = await tmdpApi.getList( TV_TYPE.topRate, CATEGORY_DATA.tv, {params});
    return res?.results ;
})

const getTvSeriesOnTheAir = createAsyncThunk(ASYNC_ACTION.GET_TV_SERIES_ON_THE_AIR, async () => {
    const params = {}
    const {results} = await tmdpApi.getList( TV_TYPE.onTheAir, CATEGORY_DATA.tv, {params});
    const fullResults = await getFullGenreOfTvSeries(results, params)
    return fullResults ;
})

const getFullGenreOfTvSeries = async (results, params) => {
    const {genres} = await tmdpApi.getGenre(CATEGORY_DATA.movie, {params});
    if(results.length > 0 && genres.length >0){
        const fullTvSeriesGenre = results.map((tvSeries,idx) => {
            let fullGenres = genres.filter((genre,idx) => (tvSeries?.genre_ids).includes(genre.id));
            return {genres: fullGenres, ...tvSeries}
        })
        return fullTvSeriesGenre
    }
}

const TvSeriesSlice = createSlice({
    name:"TvSeries",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder
        .addCase(getTvSeriesPopular.fulfilled, (state, action) => {
            state.tvSeriesPopular = action.payload
        })
        .addCase(getTvSeriesPopular.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(getTvSeriesTopRate.fulfilled, (state, action) => {
            state.tvSeriesTopRate = action.payload
        })
        .addCase(getTvSeriesTopRate.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(getTvSeriesOnTheAir.fulfilled, (state, action) => {
            state.tvSeriesOnTheAir = action.payload
        })
        .addCase(getTvSeriesOnTheAir.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})
export {getTvSeriesTopRate, getTvSeriesPopular, getTvSeriesOnTheAir}
export default TvSeriesSlice.reducer