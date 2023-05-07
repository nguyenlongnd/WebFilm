import { useContext } from "react"
import { Swiper,SwiperSlide } from "swiper/react"
import FilmItem from "../FilmItem"
import { ThemeContext } from "../../../store/contexts/themeContext"
import { Navigation, Pagination } from 'swiper';
import "./index.scss"
import "swiper/css"

function RowList({listData, title, category,...props}){
    const {themeMode} = useContext(ThemeContext)
    return(
        <div className={`container row-list my-5 ${themeMode.name}`}>
            <div className="title mb-3">
                <h4 className="text_color">{title && title.toUpperCase()}</h4>
                <span className="line"></span>
            </div>
            <Swiper 
            navigation={true}
            modules={[Navigation]}
            className="listSwiper"
            spaceBetween={5}
            slidesPerView={5}
            >
                {listData && listData.map((data, idx) => {
                    if(data) {
                        return (
                            <SwiperSlide key={idx}>
                                <FilmItem data={data} category={category}/>
                            </SwiperSlide>
                        )
                    }
                })}
            </Swiper>
        </div>
    )
}
export default RowList