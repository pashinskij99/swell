import anime from 'animejs';

const animateAlpha = (
  config: anime.AnimeParams,
  cb: (alpha: number) => void,
  complete = () => {},
) => {
  const alpha = {
    current: 0,
  };

  return anime({
    duration: 8000,
    easing: 'easeInOutQuad',
    current: 1,
    targets: alpha,
    ...config,
    update() {
      cb(alpha.current);
    },
    complete,
  });
};

export { animateAlpha };
