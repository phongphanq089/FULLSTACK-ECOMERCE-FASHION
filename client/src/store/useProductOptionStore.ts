import { create } from 'zustand'
import { Tag } from 'emblor'

type SetStateAction<T> = T | ((prev: T) => T)

interface ProductOptionState {
  sizes: Tag[]
  colorTags: Tag[]
  setSizes: (value: SetStateAction<Tag[]>) => void
  addSize: (tag: Tag) => void
  removeSize: (id: string) => void
  setColorTags: (tags: Tag[]) => void
  addColorTag: (tag: Tag) => void
  removeColorTag: (id: string) => void

  fetchOptionsFromAPI: () => Promise<void>
}

export const useProductOptionStore = create<ProductOptionState>((set) => ({
  sizes: [],
  colorTags: [],
  setSizes: (value) => {
    return set((state) => ({
      sizes:
        typeof value === 'function'
          ? (value as (prev: Tag[]) => Tag[])(state.sizes)
          : value,
    }))
  },
  addSize: (tag) => {
    return set((state) => ({
      sizes: [...state.sizes, tag],
    }))
  },
  removeSize: (id) => {
    return set((state) => ({
      sizes: state.sizes.filter((t) => t.id !== id),
    }))
  },
  setColorTags: (tags) => set({ colorTags: tags }),
  addColorTag: (tag) => {
    return set((state) => ({
      colorTags: [...state.colorTags, tag],
    }))
  },
  removeColorTag: (id) => {
    return set((state) => ({
      colorTags: state.colorTags.filter((t) => t.id !== id),
    }))
  },
  fetchOptionsFromAPI: async () => {
    const sizeData = [
      { id: '1', text: 'M' },
      { id: '2', text: 'L' },
      { id: '3', text: 'XL' },
    ]
    const colorData = [
      { id: '1', text: '#ff0000' },
      { id: '2', text: '#00ff00' },
      { id: '3', text: '#0000ff' },
    ]

    set({
      sizes: sizeData,
      colorTags: colorData,
    })
  },
}))
