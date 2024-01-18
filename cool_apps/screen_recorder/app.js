const startButton = document.getElementById('start')
const endButton = document.getElementById('end')

startButton.onclick = async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: {
      frameRate: { ideal: 30, max: 60 }
    }
  })

  const mediaRecorder = new MediaRecorder(media, {
    mimeType: 'video/webm; codecs=vp8,opus'
  })
  mediaRecorder.start()

  endButton.onclick = () => {
    mediaRecorder.stop()
  }

  const [video] = media.getVideoTracks()
  video.addEventListener('ended', () => {
    mediaRecorder.stop()
  })

  mediaRecorder.addEventListener('dataavailable', (event) => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(event.data)
    link.download = 'video.webm'
    link.click()
  })
}
