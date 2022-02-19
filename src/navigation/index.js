import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './auth';
import MainNav from './main';
import { useSelector } from 'react-redux';

function Navigation() {

    const { is_user } = useSelector(state => state.reducer);

    return (
        <NavigationContainer>
            {is_user ? <MainNav /> : <AuthNav />}
            {/* <MainNav /> */}
        </NavigationContainer>
    )
}

export default Navigation;