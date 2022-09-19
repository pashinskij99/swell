/* eslint-disable no-void */
import * as THREE from 'three';
import * as React from 'react';

const useVideoTexture = (src: string) => {
  const [texture, setTexture] = React.useState(() => new THREE.Texture());
  const [video, setVideo] = React.useState<HTMLVideoElement | null>();

  React.useEffect(() => {
    const vid = `<video
        src='${src}'
        crossorigin="anonymous"
        style="
          position: fixed;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
        "
        playsinline
        muted
        loop
      > </video>`

    const div = document.createElement('div')
    div.innerHTML = vid
    const videoEl = div.firstChild as unknown as HTMLVideoElement;
    videoEl.playbackRate = 0.5;
    document.body.appendChild(videoEl!)
    setVideo(videoEl)

    return () => {
      setVideo(null)
      div.remove()
    }
  }, [src]);

  React.useEffect(() => {
    if (video) {
      video.play();
      const t = new THREE.VideoTexture(video)
      setTexture(t);
    }
  }, [video]);

  return texture;
};

export default useVideoTexture;
