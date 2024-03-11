import { View, Pressable, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../Context/ThemeContext';

const ThemeSwitcher = () => {
    const { currentTheme, toggleTheme } = useTheme();

    // initial color theme, this is based on system color
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        // Update the Animated value when the theme changes
        Animated.timing(animatedValue, {
            toValue: currentTheme.isDarkMode ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [currentTheme.isDarkMode, animatedValue]);

    const switchButtonStyle = {
        backgroundColor: "#DBDBDB", padding: 5, borderRadius: 50, position: 'absolute', right: 2,
        marginLeft: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 35], // Adjust the value based on your design
        }),
        marginRight: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [35, 0], // Adjust the value based on your design
        }),
    }

    const iconColor = currentTheme.isDarkMode ? "black" : "#fff";
    const iconName = currentTheme.isDarkMode ? "dark-mode" : "light-mode";

    return (
        <Pressable onPress={() => toggleTheme()} style={{ borderWidth: 0.3, paddingVertical: 2, paddingHorizontal: 2, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 70, height: 35, position: 'relative', backgroundColor: currentTheme.isDarkMode ? "#444" : "#fff", }}>
            <Animated.View style={switchButtonStyle} >
                <MaterialIcons name={iconName} size={20} color={iconColor} />
            </Animated.View>
        </Pressable>

    )

}

export default ThemeSwitcher