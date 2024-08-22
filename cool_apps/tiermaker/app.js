const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

const imageInput = $('#image-input')
const itemsSection = $('#selector-items')
const resetButton = $('#reset-button')
const saveTierButton = $('#save-tier-button')

function createItem(src) {
  const imgElement = document.createElement('img')
  imgElement.src = src
  imgElement.classList.add('item-image')
  imgElement.draggable = true

  imgElement.addEventListener('dragstart', handleDragStart)
  imgElement.addEventListener('dragend', handleDragEnd)

  return imgElement
}

function useFilesToCreateItems(files) {
  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()

      reader.onload = eventReader => {
        const imgElement = createItem(eventReader.target.result)

        itemsSection.appendChild(imgElement)
      }

      reader.readAsDataURL(file)
    })
  }
}

imageInput.addEventListener('change', e => {
  const { files } = e.target

  useFilesToCreateItems(files)
})

let draggedElement = null
let sourceContainer = null

const rows = $$('.tier .row')

rows.forEach(row => {
  row.addEventListener('drop', handleDrop)
  row.addEventListener('dragover', handleDragOver)
  row.addEventListener('dragleave', handleDragLeave)
})

itemsSection.addEventListener('drop', handleDrop)
itemsSection.addEventListener('dragover', handleDragOver)
itemsSection.addEventListener('dragleave', handleDragLeave)

itemsSection.addEventListener('drop', handleDropFromDesktop)
itemsSection.addEventListener('dragover', handleDragOverFromDesktop)
itemsSection.addEventListener('dragleave', handleDragLeaveFromDesktop)

function handleDragOverFromDesktop(e) {
  e.preventDefault()

  const { currentTarget, dataTransfer } = e

  if (dataTransfer.types.includes('Files')) {
    currentTarget.classList.add('drag-files')
  }
}

function handleDropFromDesktop(e) {
  e.preventDefault()

  const { currentTarget, dataTransfer } = e

  if (dataTransfer.types.includes('Files')) {
    currentTarget.classList.remove('drag-files')

    const { files } = dataTransfer

    useFilesToCreateItems(files)
  }
}

function handleDragLeaveFromDesktop(e) {
  e.preventDefault()

  const { currentTarget } = e

  currentTarget.classList.remove('drag-files')
}

function handleDrop(e) {
  e.preventDefault()

  const { currentTarget, dataTransfer } = e

  if (sourceContainer && draggedElement) {
    sourceContainer.removeChild(draggedElement)
  }

  if (draggedElement) {
    const src = dataTransfer.getData('text/plain')
    const imgElement = createItem(src)
    currentTarget.appendChild(imgElement)
  }

  currentTarget.classList.remove('drag-over')
  $('.drag-preview')?.remove()
}

function handleDragOver(e) {
  e.preventDefault()

  const { currentTarget, dataTransfer } = e

  if (sourceContainer === currentTarget) return

  const dragPreview = document.querySelector('.drag-preview')

  if (draggedElement && !dragPreview) {
    const previewElement = draggedElement.cloneNode(true)

    previewElement.classList.add('drag-preview')

    currentTarget.appendChild(previewElement)
  }

  currentTarget.classList.add('drag-over')
}

function handleDragLeave(e) {
  e.preventDefault()

  const { currentTarget } = e

  currentTarget.classList.remove('drag-over')
  $('.drag-preview')?.remove()
}

function handleDragStart(e) {
  draggedElement = e.target
  sourceContainer = draggedElement.parentNode

  e.dataTransfer.setData('text/plain', draggedElement.src)
}

function handleDragEnd(e) {
  draggedElement = null
  sourceContainer = null
}

resetButton.addEventListener('click', () => {
  const items = $$('.tier .item-image')

  items.forEach(item => {
    item.remove()

    itemsSection.appendChild(item)
  })
})

saveTierButton.addEventListener('click', () => {
  const tierContainer = $('.tier')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  import(
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js'
  ).then(({ default: html2canvas }) => {
    html2canvas(tierContainer).then(canvas => {
      ctx.drawImage(canvas, 0, 0)

      const imgURL = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'tier.png'
      downloadLink.href = imgURL
      downloadLink.click()
    })
  })
})
