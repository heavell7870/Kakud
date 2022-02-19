import React from 'react';
import Container from '../../components/Container';
import { View, Image } from 'react-native'
import { color } from '../../utils/color';
import Button from '../../components/Button';
import { images } from '../../utils/icons';

function OnBoarding({ navigation }) {
    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>

            <Image style={{ height: "70%", width: "100%", resizeMode: "contain" }} source={images.starting_icon} />
            <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => navigation.navigate('Login')} title={"Get Started"} />
            </View>
        </Container>
    )
}

export default OnBoarding;