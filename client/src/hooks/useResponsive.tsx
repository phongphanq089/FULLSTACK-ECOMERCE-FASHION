'use client'

import { useEffect, useState } from 'react'

interface Breakpoints {
  MAX_SM: boolean
  MAX_MD: boolean
  MAX_LG: boolean
  MAX_XL: boolean
}

// === functions check responsive === //
const getBreakpoint = (width: number): Breakpoints => ({
  MAX_SM: width < 640,
  MAX_MD: width < 768,
  MAX_LG: width < 1024,
  MAX_XL: width < 1280,
})

export const useResponsive = (): Breakpoints => {
  /**
   * todo  => Khởi tạo state với giá trị mặc định để tránh lỗi Hydration
   * todo  => Initialize state with default values ​​to avoid Hydration errors
   */
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    MAX_SM: false,
    MAX_MD: false,
    MAX_LG: false,
    MAX_XL: false,
  })

  useEffect(() => {
    /**
     * todo  => Chỉ chạy trên client-side
     * todo  => Only run on client-side
     */
    const handleResize = () => {
      setBreakpoints(getBreakpoint(window.innerWidth))
    }

    handleResize()

    /**
     * todo  => Lắng nghe sự kiện resize của cửa sổ
     * todo  => Listen for window resize events
     */
    window.addEventListener('resize', handleResize)

    /**
     * todo  => Dọn dẹp sự kiện khi component unmount
     * todo  => Clean up event when component unmount
     */
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoints
}
