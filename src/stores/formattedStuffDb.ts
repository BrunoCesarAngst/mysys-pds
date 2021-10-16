import create from "zustand"

type FormattedStuffDb = {
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
  stuffFormatted: FormattedStuffDb[]
  formattedDatabaseStuffInTheState: (stuffFormatted: FormattedStuffDb[]) => void
}

const useStuffStoreFormatted = create<Store>(
  (set): Store => ({
    stuffFormatted: [],

    formattedDatabaseStuffInTheState: (stuffFormatted: FormattedStuffDb[]) =>
      set((state) => ({
        ...state,
        stuffFormatted,
      })),
  })
)

export { useStuffStoreFormatted, FormattedStuffDb }
