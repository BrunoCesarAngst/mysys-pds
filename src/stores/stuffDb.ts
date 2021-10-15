import create from "zustand"

export type StuffTypeDb = {
  id: string
  title: string
  description: string
  date: number
  update: number
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
  stuffsDbs: StuffTypeDb[]
  addDatabaseStuffInTheState: (stuffsDbs: StuffTypeDb[]) => void
}

const useStuffStoreDb = create<Store>(
  (set): Store => ({
    stuffsDbs: [],

    addDatabaseStuffInTheState: (stuffsDbs: StuffTypeDb[]) =>
      set((state) => ({ ...state, stuffsDbs })),
  })
)

export default useStuffStoreDb
