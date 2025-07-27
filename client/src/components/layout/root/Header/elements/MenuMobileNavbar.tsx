'use client'
import { Menu, Minus, Plus, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import React, { useEffect, useRef, useState } from 'react'
import Button from '~/components/ui/button'

import { navigationLinks } from '~/setting/menu/root/menu'

const MenuMobileNavbar = () => {
  return (
    <div className='max-xl:flex px-3 py-1 min-h-[50px] hidden items-center justify-between z-100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white/60 backdrop-blur-2xl rounded-2xl border'>
      <div className='flex justify-between gap-10 items-center w-full'>
        <Button className='relative px-6 py-1 rounded-3xl  text-primary-color font-bold border-primary-color  flex items-center justify-start gap-5 min-w-[100px]'>
          Cart{' '}
          <span className='flex items-center justify-center bg-white text-primary-color p-1 px-3 rounded-4xl absolute right-1'>
            5
          </span>
        </Button>
        <MobileMenu />
      </div>
    </div>
  )
}

export default MenuMobileNavbar

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }
  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className='relative z-50' ref={menuRef}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className='bg-primary-color text-white p-3 rounded-full shadow-lg'
      >
        {open ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {/* Slide-in menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='absolute bottom-16 right-0 bg-white border shadow-2xl rounded-xl w-64 p-4 flex flex-col gap-2 text-sm'
          >
            {navigationLinks.map((item, index) => (
              <div key={index} className='w-full'>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className='flex justify-between items-center w-full px-3 py-2 hover:bg-gray-100 bg-secondary-color rounded-lg font-medium'
                    >
                      {item.label}

                      {expandedIndex === index ? (
                        <Minus className='w-4 h-4  duration-200' />
                      ) : (
                        <Plus className='w-4 h-4  duration-200' />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className='pl-4 mt-1 flex flex-col gap-1'
                        >
                          {item.items?.map((subItem, subIdx) => (
                            <a
                              key={subIdx}
                              href={subItem.href}
                              className='block px-3 py-1 rounded-md hover:bg-gray-100 text-gray-700'
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href as string}
                    className='block px-3 py-2 hover:bg-gray-100 bg-secondary-color rounded-lg font-medium'
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
