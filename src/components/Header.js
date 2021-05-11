import React from 'react'
import { useSelector} from 'react-redux'
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from "@material-ui/icons/AccessTime"
const Header = () => {
    const user = useSelector((state) => state.user);
    return (
        <div className="header">
                 <div className="header__Left">
                <Avatar className="header__avatar"
                alt={user?.displayName}
                src={user?.photoURL}
                />  
                </div>
            <div className="header__Right">
                    <h2>{user?.displayName}</h2>
            </div>
        </div>
    )
}

export default Header;
