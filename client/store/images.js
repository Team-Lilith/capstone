import firestore from '../firebase'

//action types
const GOT_IMAGES = 'GOT_IMAGES'

//action creators
const gotImages = images => ({
  type: GOT_IMAGES,
  images
})

//thunks
export const getImages = () => async dispatch => {
  try {
    console.log('inside async get images')
    let images = []
    await firestore
      .collection('images')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('inside for each...')
          images.push(doc.data().url)
          console.log(`${doc.id} => ${doc.data().url}`)
        })
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
    console.log('got images', images)
    dispatch(gotImages(images))
  } catch (error) {
    console.error(error)
  }
}

// async function writeImages(){
//   await images.forEach((image)=>
//     firestore.collection("images").add({
//       url: image
//     }).then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   }));
// }

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
