const notificationReducer = (store = '', action) => {
    switch(action.type) {
        case 'NOTIFY': 
            return action.notification
        case 'UNNOTIFY':
            return ''
        default:
            return store
    }
}

export const notify = (notification) => {
    console.log(notification)
    return {
        type: 'NOTIFY',
        notification
    }
}
export const unnotify = (notification) => {
    return {
        type: 'UNNOTIFY',
        notification
    }
}

export const timeOutNotificiation = (notification, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'UNNOTIFY',
                notification: ''
            })
        }, time*1000);
    }
}

export default notificationReducer