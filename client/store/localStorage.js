//load state from local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

//puts state in local storage
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('cState', serializedState)
  } catch {
    // ignore write errors
    console.log('uh ohh')
  }
}
