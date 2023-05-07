
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from '../store/contexts/themeContext';
import tmdpApi from '../api/tmdp';
import apiConfig from '../api/apiConfig';
import FilmItem from '../components/common/FilmItem';
import { FaHeart, FaPlay } from "react-icons/fa";
import { Navigation, Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import avatarDefault from "../assets/images/avatar_default.jpg"
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function DetailItem() {
    const { category, id } = useParams();
    const [data, setData] = useState([]);
    const { themeMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchDataMovieOrTV = async () => {
            const res = await tmdpApi.getDetail(category, id);
            const credits = await tmdpApi.getCredits(category, id)
            const videos = await tmdpApi.getVideos(category, id);
            const { backdrops, posters } = await tmdpApi.getImages(category, id);
            const reviews = await tmdpApi.getReviews(category, id);
            const similars = await tmdpApi.getSimilar(category, id);

            setData({
                cast: credits.cast,
                videos: videos.results,
                backdrops: backdrops,
                posters: posters,
                reviews: reviews.results,
                totalReviews: reviews.total_results,
                similars: similars.results,
                ...res
            })
        }
        const fetchDataPerson = async () => {
            const res = await tmdpApi.getPersonDetail(category, id);
            const { cast } = await tmdpApi.getPersonCredit(category, id);
            setData({
                medias: cast,
                ...res
            })
        }
        category === "person" ? fetchDataPerson() : fetchDataMovieOrTV()
    }, [category, id])


    return (
        <div className={`detail_item pt-5 ${themeMode.name}`}>
            {category === "person" ?
                <div className='container person'>
                    <div className='person_info text_color text_color row'>
                        <div className='col-3'>
                            {
                                data.profile_path ?
                                    <img src={apiConfig.originalImage(data.profile_path)} alt="person_img" />
                                    : <img src={avatarDefault} alt="person_img_default" />
                            }
                        </div>
                        <div className='col-9'>
                            <h3>{`${data.name} (${new Date(data.birthday).getFullYear()})`} </h3>
                            <p>{data.biography}</p>
                        </div>
                    </div>
                    <div className='person_media mt-5 text_color'>
                        <div className='title mb-3'>
                            <h4>MEDIAS</h4>
                            <span className='line'></span>
                        </div>
                        <div className='row'>
                            {data.medias && data.medias.length > 0 && data.medias.map((item, idx) =>
                                <div className='col-3 my-3' key={idx}>
                                    <FilmItem data={item} category={category} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div className='movie_or_tv'>
                    <div className='poster'>
                        <img src={apiConfig.originalImage(data.backdrop_path)} alt="background_img" />
                    </div>
                    <span className='overlay mt-5'></span>
                    <div className='main_content'>
                        <div className='container py-5'>
                            <div className='row mt-5 pt-3'>
                                <div className='col-5'>
                                    <img className='banner_img' style={{ height: "100%" }} src={apiConfig.w500Image(data.poster_path)} alt='poster_img' />

                                </div>
                                <div className='col-7'>
                                    <div className='info container'>
                                        <h1>{data.title || data.name} </h1>
                                        <div className='rating d-flex align-item-center my-5'>
                                            <div className='score me-2'>{data.vote_average ? (data.vote_average).toFixed(1) : ""} </div>
                                            <span className='info_gener_button '>
                                                {(data.genres) && (data.genres).map((tag, idx) =>
                                                    <button type="button" className='btn btn-danger py-1 px-2 mx-2' key={idx}>{tag.name} </button>
                                                )}
                                            </span>
                                        </div>
                                        <p className='short_desc'>
                                            {data.overview}
                                        </p>
                                        <div className='action my-5 d-flex align-items-center'>
                                            <span className='heart'>
                                                <FaHeart />
                                            </span>
                                            <button type='button' className='btn btn-danger p-2 px-3 ms-3'>
                                                <FaPlay />
                                                WATCH NOW
                                            </button>
                                        </div>
                                        <div className='cast'>
                                            <div className='title mb-3'>
                                                <h4 style={{ color: "#fff" }}>CAST</h4>
                                                <span className='line'></span>
                                            </div>
                                            <Swiper
                                                className="listSwiper"
                                                spaceBetween={10}
                                                slidesPerView={4.5}
                                                navigation={true}
                                                modules={[Navigation]}
                                            >
                                                {data.cast && data.cast.length > 0 && (data.cast).map((cast, idx) => {
                                                    if (cast) {
                                                        return (
                                                            <SwiperSlide key={idx}>
                                                                <Link to={`../person/${cast.id}`}>
                                                                    <div className='cast_infor'>
                                                                        <img src={apiConfig.w500Image(cast.profile_path)} alt='cast_profile' />
                                                                        <div className='cast_name py-1 px-1'>
                                                                            <p className='mb-1'>{cast.original_name} </p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </SwiperSlide>
                                                        )
                                                    }
                                                })}
                                            </Swiper>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${themeMode.name}`}>
                            <div className='container py-5'>
                                <div className='videos mt-5'>
                                    <div className='title my-4'>
                                        <h4 className='text_color'>VIDEOS</h4>
                                        <span className='line'></span>
                                    </div>
                                    <Swiper
                                        className="listSwiper"
                                        navigation={true}
                                        modules={[Navigation]}
                                    >
                                        {data.videos && data.videos.length > 0 && (data.videos.splice(1, 5)).map((video, idx) => {
                                            if (video) {
                                                { console.log("detailItem-video: ", video); }
                                                return (
                                                    <SwiperSlide key={idx}>
                                                        <div className='videos_infor'>
                                                            <iframe src={apiConfig.videoYoutube(video.key)} style={{ width: "100%", height: "680px" }} title='video_youtube' />

                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })}
                                    </Swiper>
                                </div>
                                <div className='backdrops mt-5'>
                                    <div className='title my-4'>
                                        <h4 className='text_color'>BACKDROPS</h4>
                                        <span className='line'></span>
                                    </div>
                                    <Swiper
                                        className="listSwiper mySwiper"
                                        // navigation = {true}
                                        // pagination = {{
                                        // dynamicBullets:true
                                        // }}
                                        navigation pagination={{ clickable: true }}

                                        modules={[Navigation, Pagination]}
                                    >
                                        {data.backdrops && data.backdrops.length > 0 && (data.backdrops.splice(1, 10)).map((backdrop, idx) => {
                                            if (backdrop) {
                                                return (
                                                    <SwiperSlide key={idx}>
                                                        <div className='backdrop_infor'>
                                                            <img src={apiConfig.originalImage(backdrop.file_path)} alt='original-backdrop' />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })}
                                    </Swiper>
                                </div>
                                <div className='posters_img mt-5'>
                                    <div className='title my-4'>
                                        <h4 className='text_color'>POSTERS</h4>
                                        <span className='line'></span>
                                    </div>
                                    <Swiper
                                        className="listSwiper mySwiper"
                                        slidesPerView={4}
                                        spaceBetween={5}
                                        navigation={true}
                                        modules={[Navigation]}
                                    >
                                        {data.posters && data.posters.length > 0 && (data.posters.splice(1, 10)).map((poster, idx) => {
                                            if (poster) {
                                                return (
                                                    <SwiperSlide key={idx}>
                                                        <div className='poster_img'>
                                                            <img src={apiConfig.w500Image(poster.file_path)} alt='image_w500' />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })}
                                    </Swiper>
                                </div>
                                <div className='reviews mt-5'>
                                    <div className='title my-4'>
                                        <h4 className='text_color'>
                                            {`REVIEWS (${data.totalReviews})`}
                                        </h4>
                                        <span className='line'></span>
                                    </div>
                                    {data.reviews && data.reviews.splice(1, 5).map((review, idx) =>
                                        <div className='review_item my-2 p-2 hover_color' key={idx}>
                                            <span className="reviewer_info d-flex align-items-baseline text_color">
                                                {console.log("review_detailItem :", review)}
                                                <span className='avatar me-3 mt-2'>
                                                    {
                                                        review.author_details.avatar_path && !(review.author_details.avatar_path).includes("avatar") ?
                                                            <img src={apiConfig.w500Image(review.author_details.avatar_path)} alt="avatar_path" />
                                                            :
                                                            <p className={`default`}>
                                                                {(review.author.charAt(0)).toUpperCase()}
                                                            </p>
                                                    }
                                                </span>
                                            <span className='info mt-1'>
                                                <p className='author_name fw-bolder mb-1'>{review.author} </p>
                                                <p className='updated_at'>{review.updated_at} </p>
                                                <p className='content'>{review.content.substring(0, 50) + "..."} </p>

                                            </span>
                                        </span>
                                        </div>
                                    )}
                                </div>
                                <div className='recommends mt-5'>
                                    <div className='title my-4'>
                                        <h4 className='text_color'>YOU MAY ALSO LIKE</h4>
                                        <span className='line'></span>
                                    </div>
                                    <Swiper
                                        className="listSwiper mySwiper"
                                        slidesPerView={5}
                                        navigation={true}
                                        modules={[Navigation]}
                                    >
                                        {data.similars && data.similars.length > 0 && (data.similars.splice(1, 10)).map((item, idx) => {
                                            if (item) {
                                                return (
                                                    <SwiperSlide key={idx}>
                                                        <FilmItem data={item} category={category} />
                                                    </SwiperSlide>
                                                )
                                            }
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )

}

export default DetailItem;