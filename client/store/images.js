import firestore from '../../server/db'

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
    let images = []
    await firestore
      .collection('images')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          images.push(doc.data().url)
        })
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
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
