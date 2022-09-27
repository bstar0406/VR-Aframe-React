/* eslint-disable @typescript-eslint/no-floating-promises,react/forbid-dom-props */
import { Scene, Entity } from 'aframe-react'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const Controls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  margin-top: 50px;
`

const Button = styled.div`
  padding: 6px 8px;
  background-color: grey;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkgrey;
  }
`

const TimeContainer = styled.div`
  background-color: grey;
  padding: 6px 8px;
`

export const Player = () => {
  const [end, setEnd] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const sceneRef = useRef<any>(null)

  const getVideo = () => videoRef.current
  const getScene = () => sceneRef.current?.el

  const handleInitializeVideo = () => {
    const $video = getVideo()

    if ($video) {
      setEnd(Math.round($video.duration))
    }
  }

  const handlePlaying = () => {
    const $video = getVideo()

    if ($video) {
      setCurrentTime(Math.round($video.currentTime))
    }
  }

  const handleForward = () => {
    const $video = getVideo()

    if ($video) {
      $video.currentTime += 5
    }
  }

  const handleBackward = () => {
    const $video = getVideo()

    if ($video) {
      $video.currentTime -= 5
    }
  }

  const handlePlay = () => {
    const $video = getVideo()

    if ($video) {
      $video.play()
    }
  }

  const handlePause = () => {
    const $video = getVideo()

    if ($video) {
      $video.pause()
    }
  }

  const handleEnterVr = () => {
    const $video = getVideo()
    const $scene = getScene()

    if ($scene && $video) {
      $scene.enterVR()
      $video.play()
    }
  }

  return (
    <>
      <Controls>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleForward}>+5 seconds</Button>
        <Button onClick={handleBackward}>-5 seconds</Button>
        <Button onClick={handleEnterVr}>enter VR</Button>
        <TimeContainer>
          {currentTime}:{end}
        </TimeContainer>
      </Controls> 
      <Scene ref={sceneRef}>
        <a-assets>
          <video
            ref={videoRef}
            id="coolVideo"
            autoPlay
            loop
            crossOrigin="anonymous"
            onPlay={handleInitializeVideo}
            onTimeUpdate={handlePlaying}
          >
            <source src="/progressive.mp4" />
          </video>
        </a-assets>

        <Entity
          primitive="a-videosphere"
          src="#coolVideo"
        />
      </Scene>
    </>
  )
}
