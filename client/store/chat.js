//action types
const STORE_MESSAGE = 'STORE_MESSAGE'

//action creators
const storeMessage = message => ({
  type: STORE_MESSAGE,
  message
})

//thunks
export const getImages = () => async dispatch => {
  try {
    let images = []
    await firestore
      .collection('images')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          images.push({
            url: doc.data().url,
            tags: doc.data().tags
          })
        })
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
    const imagesCopy = JSON.parse(JSON.stringify(images))
    dispatch(gotImages(imagesCopy))
  } catch (error) {
    console.error(error)
  }
}

const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_IMAGES:
      return action.images
    default:
      return state
  }
}
