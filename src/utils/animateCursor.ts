import { gsap } from 'gsap';

export const addCursor = () => {
  if (window.innerWidth > 1200) {
    const cursor = document.querySelector('.cursor')
    const follower = document.querySelector('.cursor-follower');

    let posX = 0
    let posY = 0

    let mouseX = 0
    let mouseY = 0

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        gsap.set(follower, {
            css: {
            left: posX - 12,
            top: posY - 12,
            },
        });

        gsap.set(cursor, {
            css: {
            left: mouseX,
            top: mouseY,
            },
        });
      },
    });

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    })
  }
}
