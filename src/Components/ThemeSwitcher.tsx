import { View, Pressable, Animated, Easing, TouchableOpacity, Text, Modal, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeSwitcher = () => {
    const { currentTheme, toggleTheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [storedOption, setStoredOption] = useState(null);

    useEffect(() => {
        // Retrieve selected option from AsyncStorage on component mount
        retrieveSelectedOption();
    }, []);

    useEffect(() => {
        // Save selected option to AsyncStorage whenever it changes
        storeSelectedOption();
    }, [selectedOption]);

    const retrieveSelectedOption = async () => {
        try {
            setStoredOption(await AsyncStorage.getItem('selectedOption'))
            if (storedOption !== null) {
                setSelectedOption(storedOption);
            }
        } catch (error) {
            console.error('Error retrieving selected option from AsyncStorage:', error);
        }
    };

    const storeSelectedOption = async () => {
        try {
            await AsyncStorage.setItem('selectedOption', selectedOption);
        } catch (error) {
            console.error('Error storing selected option to AsyncStorage:', error);
        }
    };

    const systemColorScheme = useColorScheme();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        toggleTheme(option)
        setModalVisible(false)
        if (selectedOption === "System default") {
            toggleTheme(systemColorScheme === "light" ? "Light" : "Dark")
        }
    };

    const systemTheme = async () => {
        setStoredOption(await AsyncStorage.getItem('selectedOption'))

        if (storedOption === "System default") {

            Appearance.addChangeListener(({ colorScheme }) => {
                toggleTheme(colorScheme === "dark" ? "Dark" : "Light")
            });
        }
        else if (storedOption === "Light") {
            toggleTheme("Light")
        }
        else if (storedOption === "Dark") {
            toggleTheme("Dark")
        }
    }

    useEffect(() => {
        systemTheme()
    }, [])


    return (
        <View style={{ justifyContent: 'center', backgroundColor: currentTheme.primaryBackgroundColor }}>
            <Pressable onPress={() => setModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: currentTheme.primaryBackgroundColor }}>
                <FontAwesome name="sun-o" size={25} color={currentTheme.primaryTextColor} />

                {
                    selectedOption === "Dark" ? <MaterialIcons name="dark-mode" size={24} color={currentTheme.primaryTextColor} /> : <FontAwesome name="sun-o" size={24} color={currentTheme.primaryTextColor} />
                }

                <View style={{}} >
                    <Text style={{ color: currentTheme.primaryTextColor, fontSize: 17 }}>Theme</Text>
                    <Text style={{ color: currentTheme.secondaryTextColor }}>{selectedOption} Mode</Text>
                </View>
            </Pressable>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: currentTheme.primaryBackgroundColor, alignItems: 'flex-start' }]} >
                        <Text style={{ color: currentTheme.primaryTextColor, fontSize: 25, }} >Choose theme</Text>

                        <View style={{ gap: 20 }} >
                            <Pressable onPress={() => setSelectedOption('System default')} style={{ flexDirection: 'row', gap: 20 }} >
                                <TouchableOpacity style={[styles.radioButton]}
                                >
                                    {
                                        selectedOption === "System default" &&
                                        <View style={{ width: 10, height: 10, backgroundColor: currentTheme.primaryTextColor, borderRadius: 5 }}></View>
                                    }
                                </TouchableOpacity>
                                <Text style={[styles.label, { color: currentTheme.primaryTextColor }]}>System default</Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Light')} style={{ flexDirection: 'row', gap: 20 }} >
                                <TouchableOpacity style={[styles.radioButton]}
                                >
                                    {
                                        selectedOption === "Light" &&
                                        <View style={{ width: 10, height: 10, backgroundColor: currentTheme.primaryTextColor, borderRadius: 5 }}></View>
                                    }
                                </TouchableOpacity>
                                <Text style={[styles.label, { color: currentTheme.primaryTextColor }]}>Light</Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Dark')} style={{ flexDirection: 'row', gap: 20 }} >
                                <TouchableOpacity style={[styles.radioButton]}
                                >
                                    {
                                        selectedOption === "Dark" &&
                                        <View style={{ width: 10, height: 10, backgroundColor: currentTheme.primaryTextColor, borderRadius: 5 }}></View>
                                    }
                                </TouchableOpacity>
                                <Text style={[styles.label, { color: currentTheme.primaryTextColor }]}>Dark</Text>
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'flex-end', width: "100%" }}>
                            <Pressable onPress={() => setModalVisible(false)} style={{ paddingVertical: 10 }} >
                                <Text style={{ color: currentTheme.secondaryTextColor, fontWeight: 600, fontSize: 16 }} >
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => handleOptionSelect(selectedOption)} style={{ paddingHorizontal: 10, paddingVertical: 10 }} >
                                <Text style={{ color: currentTheme.secondaryTextColor, fontWeight: 600, fontSize: 16 }} >
                                    OK
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: "100%"
    },
    modalContent: {
        width: '80%',
        height: '38%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    radioButton: {
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderColor: "gray"
    },
    selected: {
        backgroundColor: 'white', // Change to desired color when selected
        borderColor: 'red', // Change to desired color when selected
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThemeSwitcher