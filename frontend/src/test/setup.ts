import '@testing-library/jest-dom'

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 800,
})

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  configurable: true,
  value: (cb: FrameRequestCallback) => setTimeout(cb, 16),
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  configurable: true,
  value: (id: number) => clearTimeout(id),
})