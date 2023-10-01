import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useGetOrderQuery } from '../store/apiSclice'

const TrackOrder = () => {
    const[ref, setRef] = useState('');
    const {data, isLoading, error} = useGetOrderQuery();

  return (
    <View style={styles.root}>
      {/* <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder='Your order reference'
      /> */}
      {isLoading && <ActivityIndicator />}
      {/* {data?.message !== 'Insert order successfully' && <Text>Order not found</Text>}
      {data?.message === 'Insert order successfully' && ( */}
        <Text>{JSON.stringify(data?.data, null, 2)}</Text>
      {/* )} */}
    </View>
  )
}

export default TrackOrder

const styles = StyleSheet.create({
    root: {
        padding: 10,
      },
      input: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
      },
})