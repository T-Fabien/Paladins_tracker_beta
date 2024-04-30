import { create } from "zustand"

export const useStoreSession = create((set) => ({
    sessionId: '',

    setSessionId(newSessionId) {
        set({
            sessionId: newSessionId
        })
    }
}))

export const useStoreChampion = create((set) => ({
    championList: null,

    setChampionList(newChampionList) {
        set({
            championList: newChampionList
        })
    }
}))