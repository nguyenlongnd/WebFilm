
import { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../../store/contexts/themeContext";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import LoginModal from "../../common/LoginModal";
function Header(props) {
    const listMenu =[
        {name:"home", path:""},
        {name:"movies", path:"movie"},
        {name:"tv tvseries", path:"tv"},
        {name:"search", path:"search"}
    ]
    const {themeMode, toggleThemeMode} = useContext(ThemeContext)
    return(
        <div className={`header d-flex justify-content-between px-4 py-3 mb-5 ${themeMode.name}`}>
            <div className="left d-flex align-items-center">
                <NavLink to={`/`}>
                <span className="logo">
                    <span className="text_color">Sun</span>
                    <span style={{color: "red"}}>Star</span>
                </span>
                </NavLink>
                <span className="menu">
                    <ul className="d-flex align-items-center text_color">
                        {listMenu.map((item, idx) =>
                            <li key={idx}>
                                <NavLink 
                                    className={`menu_item mx-3 p-2 ${(navData) => (navData.isActive ? "active_menu" : 'none')}`}
                                    to={`/${item.path}`}
                                >{item.name?.toUpperCase()}
                                </NavLink>
                            </li>
                        )}
                        <li className="mx-3 p-2 mode-theme d-flex justify-content-center align-items-center toggle-theme-icon" onClick={toggleThemeMode}>
                            {themeMode.name === "dark" ? <FaMoon/>: <FaSun/>}
                        </li>
                    </ul>
                </span>
            </div>

            <div className="right">
                <LoginModal/>
            </div>
        </div>
    )
}

export default Header;