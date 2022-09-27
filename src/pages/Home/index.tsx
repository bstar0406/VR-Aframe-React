import React from 'react'
import { Player } from '../../components/Player'

export const HOME_TEST_ID = 'home-page'

export const HomePage = () => (
  <div data-testid={HOME_TEST_ID}>
    <Player />
  </div>
)
