export const addActiveSelectorsForCursor = () => {
  if (window.innerWidth > 1200) {
    const cursor = document.querySelector('.cursor')
    const follower = document.querySelector('.cursor-follower');

    const addClassActive = () => {
      cursor?.classList.add('active')
      follower?.classList.add('active')
    }

    const removeClassActive = () => {
      cursor?.classList.remove('active')
      follower?.classList.remove('active')
    }

    const addClassPress = () => {
      cursor?.classList.add('press')
      follower?.classList.add('press')
    }

    const removeClassPress = () => {
      cursor?.classList.remove('press')
      follower?.classList.remove('press')
    }

    const buttons = document.querySelectorAll('button')
    const links = document.querySelectorAll('a')

    buttons.forEach((item) => {
      item.addEventListener('mousedown', addClassPress)
      item.addEventListener('mouseup', removeClassPress)
      item.addEventListener('mouseenter', addClassActive)
      item.addEventListener('mouseleave', removeClassActive)
    })
    links.forEach((item) => {
      item.addEventListener('mousedown', addClassPress)
      item.addEventListener('mouseup', removeClassPress)
      item.addEventListener('mouseenter', addClassActive)
      item.addEventListener('mouseleave', removeClassActive)
    })
  }
};
