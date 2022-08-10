import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome5 } from '@expo/vector-icons'
import 'styled-components'
import styled from 'styled-components/native'

const ContainerView = styled.View`
  min-height: 100vh;
  flex-direction: column;
  background-color: #222;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
`

const StopwatchText = styled.Text`
  font-size: 5rem;
  color: white;
`

const ButtonsView = styled.View`
  flex-direction: row;
  gap: 3rem;
`

const IconButton = styled.TouchableOpacity`
  border-radius: 50%;
  border: 1px solid #555;
  padding: 30px;

  &:hover {
    opacity: 0.75;
  }
`

const IndexText = styled.Text`
  color: #888;
`

const CheckpointText = styled.Text`
  color: white;
  font-size: 2rem;
`

export default function App() {
  const [millisecond, setMillisecond] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [checkpoints, setCheckpoints] = React.useState<string[]>([])

  React.useEffect(() => {
    const stopwatch = setInterval(() => {
      if (isPlaying) {
        setMillisecond((previousMillisecond) => previousMillisecond + 90)
      }
    }, 90)
    return () => {
      clearInterval(stopwatch)
    }
  }, [isPlaying])

  function handlePlay() {
    setIsPlaying(true)
  }

  function handlePause() {
    setIsPlaying(false)
  }

  function handleStop() {
    setIsPlaying(false)
    setMillisecond(0)
    setCheckpoints([])
  }

  function handleRecord() {
    setCheckpoints((previousCheckpoints) => [
      ...previousCheckpoints,
      generateTime(millisecond),
    ])
  }

  function padZero(num: number) {
    return num < 10 ? `0${num}` : num
  }

  function generateTime(milliSecond: number) {
    const second = Math.floor(milliSecond / 1000) % 60
    const minute = Math.floor(milliSecond / 60000) % 60
    const hour = Math.floor(milliSecond / 3600000)

    return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}.${padZero(
      (milliSecond / 10) % 100
    )}`
  }

  return (
    <ContainerView>
      <FontAwesome5 name="stopwatch" size={100} color="white" />
      <StopwatchText>{generateTime(millisecond)}</StopwatchText>
      <ButtonsView>
        {isPlaying ? (
          <>
            <IconButton onPress={handlePause}>
              <FontAwesome5 name="pause" size={50} color="white" />
            </IconButton>
            <IconButton onPress={handleRecord}>
              <FontAwesome5 name="save" size={50} color="white" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onPress={handlePlay}>
              <FontAwesome5 name="play" size={50} color="white" />
            </IconButton>
            <IconButton onPress={handleStop}>
              <FontAwesome5 name="stop" size={50} color="white" />
            </IconButton>
          </>
        )}
      </ButtonsView>
      <View>
        {checkpoints.map((checkpoint, i) =>
          i >= checkpoints.length - 10 ? (
            <CheckpointText>
              <IndexText>{`${i + 1} -> `}</IndexText>
              {checkpoint}
            </CheckpointText>
          ) : null
        )}
      </View>
      <StatusBar style="auto" />
    </ContainerView>
  )
}
