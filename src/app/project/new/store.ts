import { create } from "zustand"
import { NewProjectSchema } from "./schema"
import { createJSONStorage, persist } from "zustand/middleware"

type NewCourseState = Partial<NewProjectSchema> & {
  setData: (data: Partial<NewProjectSchema>) => void
  resetStore: () => void
}

export const initialStoreState: Partial<NewProjectSchema> = {
  name: "",
  description: "",
  category: "software",
  lead: "",
  tasks: [],
}

export const useNewProjectStore = create<NewCourseState>()(
  persist<NewCourseState>(
    (set) => ({
      setData: (data) => set(data),
      resetStore: () => set(initialStoreState),
    }),
    {
      name: "new-project-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
