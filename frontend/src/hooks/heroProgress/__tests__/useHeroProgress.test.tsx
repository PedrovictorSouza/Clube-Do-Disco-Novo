import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useHeroProgress } from '../useHeroProgress'
import { createMockScrollSource, createMockViewportSource, createMockScheduler } from '../../../test/mocks/heroProgressMocks'

describe('useHeroProgress', () => {
  let mockScroll: ReturnType<typeof createMockScrollSource>
  let mockViewport: ReturnType<typeof createMockViewportSource>
  let mockScheduler: ReturnType<typeof createMockScheduler>

  beforeEach(() => {
    mockScroll = createMockScrollSource()
    mockViewport = createMockViewportSource(800)
    mockScheduler = createMockScheduler()
  })

  it('deve inicializar com estado correto', () => {
    const { result } = renderHook(() => 
      useHeroProgress({
        scroll: mockScroll,
        viewport: mockViewport,
        scheduler: mockScheduler
      })
    )

    expect(result.current.scrollY).toBe(0)
    expect(result.current.titleOpacity).toBe(1)
    expect(result.current.gridOpacity).toBe(0)
    expect(result.current.aboutOpacity).toBe(0)
    expect(result.current.contactOpacity).toBe(0)
    expect(result.current.stage).toBe(0)
    expect(result.current.H).toBe(800)
  })

  it('deve atualizar estado quando scroll muda', async () => {
    const { result } = renderHook(() => 
      useHeroProgress({
        scroll: mockScroll,
        viewport: mockViewport,
        scheduler: mockScheduler
      })
    )

    act(() => {

      const subscribers = (mockScroll as any).subscribers
      subscribers.forEach((name: string, callback: (y: number) => void) => {
        callback(200) // scroll para 200px
      })
    })

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(result.current.scrollY).toBe(200)
    expect(result.current.titleOpacity).toBeLessThan(1)
  })

  it('deve limpar recursos quando desmontado', () => {
    const unsubscribeSpy = vi.spyOn(mockScroll, 'unsubscribe')
    const cancelSpy = vi.spyOn(mockScheduler, 'cancel')

    const { unmount } = renderHook(() => 
      useHeroProgress({
        scroll: mockScroll,
        viewport: mockViewport,
        scheduler: mockScheduler
      })
    )

    unmount()

    expect(unsubscribeSpy).toHaveBeenCalled()
  })
})