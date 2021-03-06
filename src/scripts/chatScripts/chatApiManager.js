//this is the chat's api manager componenet. It will include all the fetch calls that are directly connected to the
// the chat message
// Author: Jameka Echols

const url = "http://localhost:8088";

const chatApi = {
    postCreateMessage: (userMsg) => {
        return fetch(`${url}/messages`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userMsg)
        })
    },
    getFriends: (userId) => {
        return fetch(`${url}/friends/?currentUserId=${userId}&_expand=user`)
        .then(r => r.json())
    },
    postCreateFriendship: (friendship) => {
        return fetch(`${url}/friends`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(friendship)
        })
    },
    getMessages: () => {
        return fetch(`${url}/messages?_expand=user`)
        .then(r => r.json())
    },
    deleteMessage: (msgId) => {
        return fetch(`${url}/messages/${msgId}`,{
            method: "DELETE"
        })
    },
    putMessage: (msgObj,msgId) => {
        return fetch(`${url}/messages/${msgId}`,{
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(msgObj)
        })
    }
}

export default chatApi;