import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from '../../../api/apiConfig';
import "./index.scss"
// import { Navigation } from 'swiper';
import { Navigation, Pagination } from 'swiper';



function SliderList({listSlide}) {
    return (
        <Swiper 
        className="swiper-list"
        navigation={true}
        modules={[Navigation]}
        >
            {listSlide.length > 0 && listSlide?.map((slide,idx) => 
                <SwiperSlide key={idx}>
                    <div className='slider-item'>
                        <img src={apiConfig.originalImage(slide?.backdrop_path)} alt='img_poster' />
                        <span className='overlay'></span>
                        <div className='info container'>
                            <h1 >{slide.title || slide.name}</h1>
                            <div className='rating d-flex align-items-center my-4'>
                                <div className='score me-2'>{slide.vote_average}</div>
                                <span>
                                    {slide.genres.length > 0 && (slide.genres).map((tag,idx) =>
                                     <button type="button" className="btn btn-danger py-1 px-2 mx-2" key={idx}>{tag.name}</button>)}
                                </span>
                            </div>
                            <p className='short_desc'>
                                {slide.overview}
                            </p>
                            <button type="button" className="btn btn-danger my-4 p-2 px-3">
                                <i className="fa-solid fa-play ms-2 me-2"></i>
                                WATCH NOW
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>

    );
}

export default React.memo(SliderList);