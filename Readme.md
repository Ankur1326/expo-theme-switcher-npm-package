# expo-theme-switcher

[![npm version](https://img.shields.io/npm/v/expo-theme-switcher)](https://www.npmjs.com/package/expo-theme-switcher)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

## This is package help to handle theme toggle in bigger react native(expo) app, And it provide simple way to apply dark and light in all components

## Installation

```sh
npm install expo-theme-switcher

```

or

```sh
yarn add expo-theme-switcher

```

## Import statement

```sh
import { ThemeProvider, ThemeSwitcherBtn, useTheme } from 'expo-theme-switcher';

```

## How to use it:

```sh
    // In App.js
    // setup part...

    import { ThemeProvider, ThemeSwitcherBtn, useTheme } from 'expo-theme-switcher';

    export default function App() {

        // light theme colors
        const lightTheme = {
            primaryBackgroundColor: "white",
            secondaryBackgroundColor: "#c7c7c7",
            primaryTextColor: "#000",
            secondaryTextColor: "",
            primaryBorderColor: "black",
            secondaryBorderColor: "gray",
        }

        // dark theme colors
        const darkTheme = {
            primaryBackgroundColor: "#111",
            secondaryBackgroundColor: "#333",
            primaryTextColor: "#fff",
            secondaryTextColor: "#cccccc",
            primaryBorderColor: "white",
            secondaryBorderColor: "gray",
        }

        return (
            <ThemeProvider light={lightTheme} dark={darkTheme}>
                <Homepage /> // another component
                <ThemeSwitcherBtn /> // toggle button
            </ThemeProvider>
        );
}

```

```sh
    // In Homepage.tsx

    import { useTheme } from 'expo-theme-switcher'

    const Homepage = () => {
    const { currentTheme } = useTheme() // currentTheme is a object

    // currentTheme give like this object
    // console.log("currentTheme : ", currentTheme) // currentTheme :  {"isDarkMode": false, "primaryBackgroundColor": "white", "primaryTextColor": "#000", "secondaryBackgroundColor": "#ccc", "secondaryTextColor": "#4d4d4d"}

    return (
        <View style={{backgroundColor: currentTheme.primaryBackgroundColor}}>
            <Text style={{color: currentTheme.primaryTextColor}} >Homepage</Text>
            <Text style={{color: currentTheme.primaryTextColor}}>Homepage</Text>
        </View>
    )
}

export default Homepage


```
