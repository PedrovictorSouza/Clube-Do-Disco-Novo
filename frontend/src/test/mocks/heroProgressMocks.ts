import { ScrollSource, ViewportSource, Scheduler } from '../../hooks/heroProgress/types'

export const createMockScrollSource = (): ScrollSource & { subscribers: Map<(y: number) => void, string> } => {
  const subscribers = new Map<(y: number) => void, string>()
  
  return {
    subscribers, // Expor para testes
    subscribe: (cb: (y: number) => void, name?: string) => {
      subscribers.set(cb, name || 'mock')
    },
    unsubscribe: (cb: (y: number) => void) => {
      subscribers.delete(cb)
    },
    listSubscribersNames: () => Array.from(subscribers.values()),
  }
}

export const createMockViewportSource = (height = 800): ViewportSource => {
  let currentHeight = height
  const resizeCallbacks: (() => void)[] = []
  
  return {
    getHeight: () => currentHeight,
    onResize: (cb: () => void) => {
      resizeCallbacks.push(cb)
    },
    offResize: (cb: () => void) => {
      const index = resizeCallbacks.indexOf(cb)
      if (index > -1) resizeCallbacks.splice(index, 1)
    },
  }
}

export const createMockScheduler = (): Scheduler => {
  let nextId = 1
  const activeFrames = new Map<number, FrameRequestCallback>()
  
  return {
    raf: (cb: FrameRequestCallback) => {
      const id = nextId++
      activeFrames.set(id, cb)

      setTimeout(() => {
        if (activeFrames.has(id)) {
          cb(performance.now())
          activeFrames.delete(id)
        }
      }, 0)
      return id
    },
    cancel: (id: number) => {
      activeFrames.delete(id)
    },
  }
}