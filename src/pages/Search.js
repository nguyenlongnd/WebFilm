import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../store/contexts/themeContext"
import useDebounce from "../hooks/useDebounce";
import tmdpApi from "../api/tmdp";
import { Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import FilmItem from "../components/common/FilmItem";
import avatar_default from "../assets/images/avatar_default.jpg"


function Search() {
    const listTab = [
        {label : "movies", param: "movies"},
        {label: "tv series", param: "tv"},
        {label: "people", param: "person"}
    ]
    const {themeMode} = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState("movie");
    const [value, setValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const debounceValue = useDebounce(value,500)

    const handleSearch = (e) => {
        setValue (e.target.value)
    }
    
    useEffect(()=>{
        const getDatas = async () => {
            const res = await tmdpApi.search(activeTab, debounceValue);
            setSearchResults(res.results)
        }
        getDatas();
    }, [debounceValue,activeTab])

    return (
        <div className="text_color search py-3">
            <ul className="d-flex justify-content-center">
                {listTab.map((tab,idx) => 
                    <li key={idx}>
                        <span 
                            className={`tabItem p-2 mx-2 ${activeTab === tab.param ? "active_tab" : ""}`}
                            onClick={() => setActiveTab(tab.param)}
                        >
                            {tab.label.toUpperCase()}
                        </span>
                    </li>
                )}
            </ul>

            <div className="form">
                <div className={`${themeMode.name}`}>
                    <input 
                        type = "text"
                        value = {value}
                        className="text-color form-control p-2 py-3"
                        placeholder="serch SunStar"
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="search_results container">
                <div className="row">
                    {console.log(searchResults)}
                    {searchResults && searchResults.length > 0 && searchResults.map((item,idx) => 
                        <div className='col-3 my-3' key={idx}>
                            {activeTab === "person" ? 
                                <Link to={`../person/${item.id}`}>
                                <div className="cast_infor">
                                    { item.profile_path ?
                                        <img src={apiConfig.w500Image(item.profile_path)} alt="person_avatar" />
                                        : <img src={avatar_default}  alt="person_img_default" />
                                    }
                                    <div className="cast_name py-1 px-1">
                                        <p className="mb-1">{item.original_name}</p>
                                    </div>
                                </div>
                                </Link>
                                :
                                <FilmItem data={item} category={activeTab} />
                            }
                        </div>
                    )}
                </div>
            </div>

        </div>
    )

}

export default Search;