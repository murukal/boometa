export interface AppProfile {
  isInitialized: boolean
}

const getInitialState = (): AppProfile => ({
  isInitialized: false
})

export default getInitialState
