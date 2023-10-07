import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const NetworkImage = ({source,width, height, borderRadius}) => {
  return (
    <Image
    source={{uri: source}}
    style={styles.image(width, height,borderRadius)}
    />
  )
}

export default NetworkImage

const styles = StyleSheet.create({

  image:(width, height, borderRadius)=>({
    width:width,
    height: height,
    borderRadius: borderRadius,
    resizeMode: 'cover'
  })
})