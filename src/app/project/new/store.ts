import { create } from "zustand"
import { NewProjectSchema } from "./schema"
import { createJSONStorage, persist } from "zustand/middleware"

type NewCourseState = Partial<NewProjectSchema> & {
  setData: (data: Partial<NewProjectSchema>) => void
}

export const useNewProjectStore = create<NewCourseState>()(
  persist<NewCourseState>(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "new-project-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
