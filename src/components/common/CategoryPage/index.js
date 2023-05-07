import SliderList from "../SliderList"
import FilmItem from "../FilmItem"
import loading from "../../../assets/images/loading.gif"

import { useState } from "react"
function CategoryPage({title, listSlide, category, onChangeType, listData, activeType,onHandleLoadmore, loadStatus = false}) {
    const [currentPage, setCurrentPage] = useState(1)
    const listType = [
        {
            label: "popular",
            path: "popular"
        },
        {
            label: "top rated",
            path: "top_rated"
        }
    ]

    const handleChangeType = (type) =>{
        onChangeType(type)
    }

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1)
        onHandleLoadmore(currentPage + 1)
    }

    return (
        <div className="category-page">
            <SliderList listSlide={listSlide}/>
            <div className="narbar container my-4 ps-3 d-flex justify-content-between">
                <h4 className="text_color">{title.charAt(0).toUpperCase() + title.slice(1)} </h4>
                <span>
                    {listType.map((type, idx) => 
                        <button 
                            className={`p-2 mx-2 btn jw-semibold text_color ${activeType === type.label && "btn-danger"}`}
                            key={type.label}
                            onClick={() => handleChangeType(type?.label)}
                            >
                            {type?.label.toUpperCase()}
                        </button>
                    )}
                </span>
            </div>
            <div className="listData container">
                <div className="row">
                    {listData.map((data,idx) =>
                    <div className="col-3 my-3" key={idx}>
                        <FilmItem data={data} category={category}/>
                    </div>
                    )}
                </div>
                <div className="d-grid py-2">
                    <button
                        className="btn btn-danger my-5 py-2"
                        type="button"
                        onClick={() => handleLoadMore()}
                    >
                        {loadStatus ? 
                        <img className="ms-2" width="35px" height= "35px" src={loading} alt="loadingImg"/> 
                        :"LOAD MORE"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage ;