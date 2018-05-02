import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { PlayButton, ProgressBar, ExpandButton } from './controls'
import { getUrlPath } from '../../../../utils'
import ExpandIcon from './ExpandIcon'
import MediaWrap from '../wrap'

const Video = styled.video`
  background: #111111;
  width: 100%;
  height: 100%;
  object-fit: ${({ isExpanded }) => (!isExpanded ? 'cover' : 'contain')};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${({ autoPlay }) =>
    autoPlay &&
    `
    &::media-controls-start-playback-button {
      display: none;
      appearance: none;
    }
  `};
`

class CardVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: props.autoPlay,
      progress: 0
    }
  }

  togglePlayback = event => {
    if (this.props.controls) {
      event.preventDefault()
      this.setState(({ playing }) => {
        const action = !playing ? 'play' : 'pause'
        this.video[action]()
        return { playing: !playing }
      })
    }
  }

  updateProgress = () => {
    const progress = this.video.currentTime / this.video.duration * 100
    this.setState({ progress })
  }

  render () {
    const {
      autoPlay,
      cardSize,
      controls,
      expandClick,
      image,
      loading,
      loop,
      isExpanded,
      muted,
      playsInline,
      video,
      ...props
    } = this.props
    const { playing, progress } = this.state

    return (
      <MediaWrap
        className='microlink_card__media_video_wrapper'
        cardSize={cardSize}
        loading={loading}
        onClick={this.togglePlayback}
        isExpanded={isExpanded}
        {...props}
      >
        <Video
          className='microlink_card__media_video'
          src={getUrlPath(video)}
          poster={image}
          muted={muted}
          autoPlay={autoPlay}
          loop={loop}
          playsInline={playsInline}
          innerRef={node => (this.video = node)}
          isExpanded={isExpanded}
          {...(controls ? { onTimeUpdate: this.updateProgress } : {})}
        />
        <PlayButton cardSize={cardSize} visible={controls && !playing} />
        {controls && (
          <Fragment>
            <ExpandButton cardSize={cardSize} onClick={expandClick}>
              <ExpandIcon
                isExpanded={isExpanded}
                className='microlink_card__media_video__expand_icon'
              />
            </ExpandButton>
            <ProgressBar
              cardSize={cardSize}
              progress={progress}
              playing={playing}
            />
          </Fragment>
        )}
      </MediaWrap>
    )
  }
}

export default CardVideo
