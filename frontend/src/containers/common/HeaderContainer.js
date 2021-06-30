import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../modules/auth';
import Header from '../../components/common/Header';
import Menu from '../../components/common/Menu';
import decodeJWT from '../../lib/decodeJWT';

const HeaderContainer = () => {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [menu, setMenu] = useState(false);
    const [profile, setProfile] = useState(false);

    const dispatch = useDispatch();
    const {auth} = useSelector( ({auth}) => ({
            auth : auth.auth
        })
    )

    const toggleMenu = () => {
        setMenu(!menu);
        if(profile) {
            setProfile(!profile);
        }
    }

    const logoutCallback = useCallback(() => {
        localStorage.removeItem('jwt');
        dispatch(logout());
    }, [dispatch])

    useEffect(() => {
        if(auth === null) {
            setUsername('');
        } else {
            let jwt = JSON.parse(decodeJWT(auth));
            setId(jwt['id']);
            setUsername(jwt['name'])
        }
    }, [setUsername, setId, auth])
    
    return (
        <>
            <Header
                id={id}
                username={username} 
                toggleMenu={toggleMenu}
                showProfile={setProfile}
                logout={logoutCallback}
            />
            { menu && <Menu /> }
        </>
    )
}

export default HeaderContainer;