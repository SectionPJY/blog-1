import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../modules/user';
import Header from '../components/Header';
import Menu from '../components/Menu';

const HeaderContainer = () => {
    const [menu, setMenu] = useState(false);
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector( ({user}) => ({
            user : user.user
        })
    )

    const toggleMenu = () => {
        setMenu(!menu);
        if(profile) {
            setProfile(!profile);
        }
    }
    
    return (
        <>
            <Header
                username={user != null ? user.username : null} 
                toggleMenu={toggleMenu}
                profile={profile}
                setProfile={setProfile}
                logout={() => dispatch(logout())} 
            />
            { menu && <Menu /> }
        </>
    )
}

export default HeaderContainer;