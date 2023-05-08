import React, { useContext } from 'react';
import "./index.scss"
import { ThemeContext } from '../../../store/contexts/themeContext';
import { Link } from 'react-router-dom';

Footer.propTypes = {
    
};

function Footer(props) {
    const listMenu = [
        {name:"home",path:""},
        {name:"movies",path:"movies"},
        {name:"tv series",path:"tv"},
        {name:"search",path:"search"},
    ]

    const {themeMode} = useContext(ThemeContext);
    return (
        <div className={`footer px-4 py-4 d-flex justify-content-between ${themeMode.name}`}>
            <Link to="/">
            <span className='logo'>
                <span className='text_color'>Sun</span>
                <span style={{color:"red"}}>Star</span>
            </span>
            </Link>
            <ul className='d-flex align-items-center text_color'>
                {listMenu.map((item,idx) =>
                    <li 
                        key={idx} 
                    >
                        <Link 
                            className="menu_item mx-3 p-2"
                            to={`/${item.path}`}
                        >{item.name?.toUpperCase()}
                        </Link>
                    </li> 
                )}
            </ul>
    </div>
    );
}

export default Footer;