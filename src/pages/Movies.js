import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CATEGORY_DATA, MOVIE_TYPE} from "../api/tmdp"
import CategoryPage from "../components/common/CategoryPage";
import tmdpApi from "../api/tmdp";
import { getMoviesPopular, getMoviesUpcoming, getMoviesTopRate } from "../store/slices/moviesSlice";
function Movies (){
    const {moviesPopular, moviesTopRate, moviesUpcoming } = useSelector(state => state.movies);
    const [listData, setListData] = useState(moviesPopular);
    const [activeType, setActiveType] = useState("popular");
    const [loadStatus, setLoadStatus] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesUpcoming());
        dispatch(getMoviesTopRate());
        dispatch(getMoviesPopular());
    }, [dispatch])

    useEffect(() => {
        activeType === "popular" ? setListData(moviesPopular) : setListData(moviesTopRate)

    }, [activeType, moviesTopRate, moviesPopular])

    const handleChangeType = (type) => {
        setActiveType(type)
    }

    const handleLoadmore = async (page) => {
        setLoadStatus(true);
        const  res = activeType === "popular" ?
        await tmdpApi.getList(MOVIE_TYPE.popular, CATEGORY_DATA.movie, {page: page})
        : await tmdpApi.getList(MOVIE_TYPE.topRate, CATEGORY_DATA.movie)
        setTimeout(() => {
            const newData = [...listData, ...(res.results)];
            setListData(newData)
            setLoadStatus(false)
        }, 1000)
    }

    return (
        <div className="movies">
            <CategoryPage
                title = "movies"
                listData={listData}
                activeType={activeType}
                loadStatus = {loadStatus}
                listSlide={moviesUpcoming}
                category="movie"
                onChangeType={handleChangeType}
                onHandleLoadmore={handleLoadmore}
            />
        </div>
    )
}

export default Movies;