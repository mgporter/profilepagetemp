type Color = [number, number, number, number];

function mixColors(bg: Color, fg: Color): Color {
  /* For mixing background and foreground */
  const bgP = 1 - fg[3];  // background percent
  return [bg[0]*bgP + fg[0]*fg[3], bg[1]*bgP + fg[1]*fg[3], bg[2]*bgP + fg[2]*fg[3], 1];
}

function colorToRGBA(color: Color): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

function colorsToThreePartGradient(color1: Color, color2: Color, color3: Color): string {
  const middleColor = colorToRGBA(color2);
  return `radial-gradient(circle at 0% 0%, ${colorToRGBA(color1)} 20%, ${middleColor} 60%, ${middleColor} 84%, ${colorToRGBA(color3)} 100%)`;
}

function setStyles() {

  const bgGradient1: Color = [40, 57, 129, 1];
  const bgGradient2: Color = [30, 116, 142, 1];
  const bgGradient3: Color = [18, 80, 98, 1];
  const mainOverlay: Color = [10, 35, 68, 0.6];


  const root = document.querySelector(":root");
  if (root instanceof HTMLElement) {
    root.style.setProperty("--main-overlay", colorToRGBA(mainOverlay));

    root.style.setProperty("--bg-gradient", colorsToThreePartGradient(bgGradient1, bgGradient2, bgGradient3));
    root.style.setProperty("--bg-gradient-with-overlay", 
      colorsToThreePartGradient(
        mixColors(bgGradient1, mainOverlay), 
        mixColors(bgGradient2, mainOverlay), 
        mixColors(bgGradient3, mainOverlay)
      )
    );
  }

}

export { setStyles };