import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '../Context/ThemeContext';

const AnotherCom = () => {
    const { currentTheme } = useTheme()
    return (
        <View style={{ backgroundColor: currentTheme.primaryBackgroundColor }} >
            <Text style={{ color: currentTheme.primaryTextColor }}>AnotherCom</Text>
            <Text style={{ color: currentTheme.primaryTextColor }}>AnotherCom</Text>
            <Text style={{ color: currentTheme.primaryTextColor }}>AnotherCom</Text>
            <Text style={{ color: currentTheme.primaryTextColor }}>AnotherCom</Text>
        </View>
    )
}

export default AnotherCom