export const getViewportData = () => {
  const height = window.visualViewport
    ? window.visualViewport.height
    : document.documentElement.clientHeight || window.innerHeight;

  const offsetTop = window.visualViewport ? window.visualViewport.offsetTop : 0;

  return {
    height,
    offsetTop,
  };
};

export const updateViewportCssVariables = () => {
  const { height, offsetTop } = getViewportData();
  document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
  document.documentElement.style.setProperty('--viewport-offset-top', `${offsetTop}px`);
};