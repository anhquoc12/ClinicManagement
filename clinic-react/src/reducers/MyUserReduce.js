// import { Cookies } from "react-cookie"

import Cookies from "js-cookie"

const MyUserReduce = (currentState, action) => {
    switch (action.Type) {
        case "login":
            return action.payload
        case "logout":
            Cookies.remove('token')
            Cookies.remove('user')
            return null
        // default:
    }

    return currentState
}

export default MyUserReduce