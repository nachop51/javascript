import './style.css'

const form = document.querySelector('form')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  showSpinner()
  const formData = new FormData(form)
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: formData.get('prompt') })
  })

  if (response.ok) {
    const { image } = await response.json()

    const result = document.querySelector('#result')!

    result.innerHTML = `<img src="${image}" width="512" />`
  } else {
    const { error } = await response.json()
    alert(error)
  }
  hideSpinner()
})

function showSpinner() {
  const button = document.querySelector('button')!
  button.disabled = true
  button.innerHTML = `Dreaming... <span class="spinner"></span>`
}

function hideSpinner() {
  const button = document.querySelector('button')!
  button.disabled = false
  button.innerHTML = `Dream`
}