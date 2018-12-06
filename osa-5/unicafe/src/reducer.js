const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {

    console.log(action)
    switch (action.type) {
      case 'GOOD':{
      const newState = {...state}
      newState.good+=1
        return newState
      }

      case 'OK':{
      const newState = {...state}
      newState.ok+=1
        return newState
      }

      case 'BAD':{
      const newState = {...state}
      newState.bad+=1
        return newState
      }

      case 'ZERO':{
        const newState = {...state}
        newState.good=0
        newState.ok=0
        newState.bad=0
        return newState
      }
      default:
        return state
      }
  }
  
  export default counterReducer