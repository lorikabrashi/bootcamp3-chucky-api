const favExist = document.getElementsByClassName('favorites')
const isHomePage = document.getElementsByClassName('search')

if (favExist.length) {
  const data = getStoredData()
  const favList = document.getElementById('favorite-list')

  data.forEach((elem) => {
    const listElem = document.createElement('li')
    const iElem = document.createElement('i')
    iElem.dataset.id = elem.id
    iElem.dataset.value = elem.value
    iElem.classList.add('fa-star', 'fa-solid')
    iElem.addEventListener('click', removeItem)
    
    spanElem = document.createElement('span')
    spanElem.innerHTML = elem.value
    listElem.appendChild(iElem)
    listElem.appendChild(spanElem)
    favList.appendChild(listElem)
  })
}

if (isHomePage.length) {
  const icons = document.getElementsByClassName('fa-star')
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', toggleData)
    checkStars(icons[i])
  }
}

function removeItem() {
  const data = getStoredData()
  const found = data.findIndex((elem) => elem.id === this.dataset.id)
  data.splice(found, 1)
  localStorage.setItem('favorite_jokes', JSON.stringify(data))
  this.parentNode.remove()
}

function checkStars(elem) {
  const data = getStoredData()
  const id = elem.dataset.id
  const found = data.find((e) => e.id === id)
  if (found) {
    elem.classList.remove('fa-regular')
    elem.classList.add('fa-solid')
  }
}

function toggleData() {
  const data = getStoredData()
  const obj = {
    id: this.dataset.id,
    value: this.dataset.value,
  }

  const index = data.findIndex((elem) => elem.id === this.dataset.id)
  if (index < 0) {
    data.push(obj)
    localStorage.setItem('favorites_jokes', JSON.stringify(data))
    this.classList.remove('fa-regular')
    this.classList.add('fa-solid')
  } else {
    data.splice(index, 1)
    localStorage.setItem('favorites_jokes', JSON.stringify(data))
    this.classList.remove('fa-solid')
    this.classList.add('fa-regular')
  }
}

function getStoredData() {
  let favorites_jokes = localStorage.getItem('favorites_jokes')
  if (!favorites_jokes) {
    return []
  } else {
    favorites_jokes = JSON.parse(favorites_jokes)
    return favorites_jokes
  }
}
