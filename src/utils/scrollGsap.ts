import { gsap } from 'gsap'

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

interface IScroller {
  target: HTMLDivElement
  // target: string
  ease: number
  endY: number
  y: number
  resizeRequest: number
  scrollRequest: number
}

// TODO add elevent by argument
export const addScroll = (a : any, b : any) => {
  // const html = document.documentElement
  // const { body } = document
  //
  // const scroller : IScroller = {
  //   // target: element as HTMLDivElement,
  //   target: document.querySelector('#scroll_container'),
  //   ease: 0.05,
  //   endY: 0,
  //   y: 0,
  //   resizeRequest: 1,
  //   scrollRequest: 0,
  // }
  //
  // console.log(element)
  //
  // let requestId : number | null = null
  //
  // gsap.set(scroller.target, {
  //   rotation: 0.01,
  //   force3D: true,
  // });
  //
  // const updateScroller = () => {
  //   const resized = scroller.resizeRequest > 0;
  //
  //   if (resized) {
  //     const height = scroller.target.getBoundingClientRect().height || 0;
  //     body.style.height = `${height}px`
  //     scroller.resizeRequest = 0;
  //   }
  //
  //   const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
  //
  //   scroller.endY = scrollY;
  //   scroller.y += (scrollY - scroller.y) * scroller.ease;
  //
  //   if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
  //     scroller.y = scrollY;
  //     scroller.scrollRequest = 0;
  //   }
  //
  //   gsap.set(scroller.target, {
  //     y: -scroller.y,
  //   });
  //
  //   requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
  // }
  //
  // const onResize = () => {
  //   scroller.resizeRequest += 1;
  //   if (!requestId) {
  //     requestId = requestAnimationFrame(updateScroller);
  //   }
  // }
  //
  // const bodyHeight = () => {
  //   const { height } = body.style
  //
  //   return Number(height.substring(0, height.length - 2))
  // }
  //
  // const onScroll = () => {
  //   scroller.scrollRequest += 1;
  //
  //   if (!requestId) requestId = requestAnimationFrame(updateScroller);
  //   if (scroller.target.clientHeight !== bodyHeight()) onResize()
  // }
  //
  // const onLoad = () => {
  //   updateScroller()
  //   window.focus()
  //   window.addEventListener('resize', onResize)
  //   document.addEventListener('scroll', onScroll)
  // }
  //
  // if (scroller.target.clientHeight !== bodyHeight()) onResize()
  //
  // window.onload = () => {
  //   onLoad()
  // }

  gsap.registerPlugin(a, b)

  const container = document.querySelector('.app-slider')

  let height;
  function setHeight() {
    height = container!.clientHeight
    document.body.style.height = `${height}px`
  }
  a.addEventListener('refreshInit', setHeight)

  gsap.to(container, {
    y: () => -(
      container!.getBoundingClientRect().height - document.documentElement.clientHeight
    ),
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
  setHeight()
  document.querySelector('#root')!.style.position = 'fixed'
};
