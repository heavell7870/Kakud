import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../../screens/onBoarding';
import Login from '../../screens/login';
import Verification from '../../screens/verification';
import Register from '../../screens/Register';

function AuthNav() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen component={OnBoarding} name="OnBoarding" options={{ header: () => null }} />
            <Stack.Screen component={Login} name="Login" options={{ header: () => null }} />
            <Stack.Screen component={Register} name="Register" options={{ header: () => null }} />
            <Stack.Screen component={Verification} name="Verification" options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

export default AuthNav;