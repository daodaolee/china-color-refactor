export function animationDelayTime(index: number) {
  let time = 0
  switch (index % 8) {
    case 0:
      time = 0.15
      break
    case 1:
    case 7:
      time = 0.3
      break
    case 2:
      time = 0.5
      break
    case 3:
    case 6:
      time = 0.6
      break
    case 4:
      time = 0.4
      break
    case 5:
      time = 0.2
      break
  }
  return time * Math.random() + 0.4
}

interface Color {
  r: number
  g: number
  b: number
}
export function isLightColor(color: Color) {
  // 计算颜色的相对亮度，常见的计算方式是 Y = 0.299*R + 0.587*G + 0.114*B
  const brightness = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255
  return brightness > 0.5
}
