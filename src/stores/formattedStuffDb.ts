import create from "zustand"

export type formattedStuffDb = {
  id: string
  title: string
  description: string
  date: string
  update: string
  userId: string
  discerned: boolean
  fastAction?: boolean
  incubate?: boolean
  reference?: boolean
  trash?: boolean
  delegated?: boolean
  actionDate?: boolean
  context?: boolean
  project?: boolean
  completed?: boolean
}

type Store = {
  stuffFormatted: formattedStuffDb[]
  formattedDatabaseStuffInTheState: (stuffFormatted: formattedStuffDb[]) => void
}

const useStuffStoreFormatted = create<Store>(
  (set): Store => ({
    stuffFormatted: [],

    formattedDatabaseStuffInTheState: (stuffFormatted: formattedStuffDb[]) =>
      set((state) => ({
        ...state,
        stuffFormatted,
      })),
  })
)

export default useStuffStoreFormatted
