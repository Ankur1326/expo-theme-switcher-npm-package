# expo-theme-switcher

[![npm version](https://img.shields.io/npm/v/expo-theme-switcher)](https://www.npmjs.com/package/expo-theme-switcher)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

## This is package help to handle theme toggle in bigger react native(expo) app, And it provide simple way to apply dark and light in all components

#Light Mode
<div style="clear: both;">
    <img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/21774ba6-40bd-4dc4-80e3-04e22454447f" width="40%" alt="Light Mode Button">
</div>


<img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/8e3143b4-008d-49bb-9f13-22f28f4d149e" width="40%" alt="Dark Mode Btn Screen">
<img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/59237bf5-d033-46c0-9254-dd54418ea900" width="40%" alt="Dark Mode Modal">

#Dark Mode
<div style="clear: both;">
    <img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/13e179f0-7c4f-49a6-87f2-43d75429e62e" width="40%" alt="Dark Mode Button">
</div>

<img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/5868146c-c45f-43ba-8961-37c4f3d02347" width="40%" alt="Dark Mode Btn screen">
<img src="https://github.com/Ankur1326/expo-theme-switcher-npm-package/assets/121030267/1ef46421-866d-439b-b8eb-21914895ec49" width="40%" alt="Dark Mode Btn screen">


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


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Ankur1326/expo-theme-switcher-npm-package/issues).

## Show your support

Give a ⭐️ if this project helped you!
