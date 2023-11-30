import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
    blue: "#0859C59F",
    lightBlue: '#e9f0ff',
    red: "#EB6A58",
    green: "#449282",
    white: "#FBFBFB",
    lightWhite: "#FFFFFF",
    lightRed: "#EB9C9B",
    lightGreen: "#73ADA1",
    black: '#121212',
    dark: '#3D3A45',
    gray: '#8C8896',
    lightGrey: '#D1CFD5',

};


const SIZES = {
    xSmall: 10,
    small: 12,
    xmedium: 14,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    height,
    width
};

const TEXT = {
    xxSmall: 11,
    xSmall: 13,
    small: 15,
    medium: 17,
    large: 21,
    xLarge: 27,
    xxLarge: 32,
};


const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};


export { COLORS, SIZES, SHADOWS, TEXT };