import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorText = ({ touched, error }) => {
    if (!touched) return null;
    return <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
    error: { fontSize: 14, color: 'red' }
})

export default ErrorText
