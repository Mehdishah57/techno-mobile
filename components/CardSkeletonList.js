import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardSkeleton from './CardSkeleton'

const CardSkeletonList = ({ number }) => {
    return (
        <>
            <View style={styles.container}>
                {[1,2,3,4,5,6,7,8,9,10].map(item => <CardSkeleton key={item}></CardSkeleton>)}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default CardSkeletonList
