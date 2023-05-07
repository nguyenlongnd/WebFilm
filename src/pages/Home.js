import { useEffect } from "react"
import SliderList from "../components/common/SliderList"
import RowList from "../components/common/RowList";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesTopRate, getMoviesPopular, getMoviesNowPlaying } from "../store/slices/moviesSlice"
import { getTvSeriesTopRate, getTvSeriesPopular } from '../store/slices/tvSeriesSlice';
import { CATEGORY_DATA } from '../api/tmdp';
function Home() {
    const {moviesPopular, moviesTopRate, moviesNowPlaying }= useSelector(state => state.movies);
    const {tvSeriesPopular, tvSeriesTopRate} = useSelector(state => state.tvSeries);
    const dispatch = useDispatch();
    useEffect(() => {
        //get data movies
        dispatch(getMoviesTopRate())
        dispatch(getMoviesPopular())
        dispatch(getMoviesNowPlaying())

        // get data tv series
        dispatch(getTvSeriesTopRate())
        dispatch(getTvSeriesPopular())
        // window.scrollTo(0,0)
    }, [dispatch])
    return (
        <div className="home">
            <SliderList listSlide={moviesNowPlaying} />
            <RowList title={"Popular Movies"} listData={moviesPopular} category={CATEGORY_DATA.movie} />
            <RowList title={"Top rated Movies"} listData={moviesTopRate} category={CATEGORY_DATA.movie} />
            <RowList title={"TV Series Popular"} listData={tvSeriesPopular} category={CATEGORY_DATA.movie} />
            <RowList title={"TV Series Top rated"} listData={tvSeriesTopRate} category={CATEGORY_DATA.movie} />

        </div>
    )
}
export default Home;