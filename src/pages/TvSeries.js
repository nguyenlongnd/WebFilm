
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tmdpApi, { CATEGORY_DATA, TV_TYPE } from '../api/tmdp';
import CategoryPage from '../components/common/CategoryPage';
import { getTvSeriesOnTheAir, getTvSeriesPopular, getTvSeriesTopRate } from '../store/slices/tvSeriesSlice';


TvSeries.propTypes = {
    
};

function TvSeries(props) {
    const {tvSeriesOnTheAir, tvSeriesPopular,tvSeriesTopRate  }= useSelector(state => state.tvSeries);
    const [listData, setListData] = useState(tvSeriesPopular);
    const [activeType, setActiveType] = useState("popular")
    const [loadStatus, setLoadStatus] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(getTvSeriesOnTheAir());
        if(!(tvSeriesPopular.length > 0 && tvSeriesTopRate.length > 0)) {
            dispatch(getTvSeriesPopular())
            dispatch(getTvSeriesTopRate());
        }
    }, [dispatch, tvSeriesPopular.length, tvSeriesTopRate.length])

    useEffect(() => {
        activeType === "popular" ? setListData(tvSeriesPopular) : setListData(tvSeriesTopRate)
    }, [activeType, tvSeriesTopRate, tvSeriesPopular])

    const handleChangeType = (type) => {
        setActiveType(type)
    }

    const handleLoadmore = async (page) => {
        setLoadStatus(true);
        const res = activeType === "popular" ? 
        await tmdpApi.getList(TV_TYPE.popular, CATEGORY_DATA.tv, {page: page}) 
        : await tmdpApi.getList(TV_TYPE.popular, CATEGORY_DATA.tv, {page: page}) ;
        console.log("page: ", page);
        console.log("res ", res);
        setTimeout(() => {
            const newData = [...listData,...(res.results)];
            setListData(newData)
            setLoadStatus(false)
        },[1000])
    }

    return (
        <div className='movies'>
            <CategoryPage 
                title="tv series" 
                listData={listData} 
                activeType={activeType}
                loadStatus= {loadStatus} 
                listSlide={tvSeriesOnTheAir} 
                category="tv" 
                onChangeType={handleChangeType}
                onHandleLoadmore={handleLoadmore}
            />
        </div>   
    );
}

export default TvSeries;