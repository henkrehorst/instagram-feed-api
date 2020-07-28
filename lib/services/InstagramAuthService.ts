import unirest from "unirest"

async function getAccessTokenAndUserId(code: string) {
    //transfer auth code to access token
    return await unirest.post(`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`)
        .field("client_id", process.env.NEXT_PUBLIC_FB_CLIENT_ID)
        .field("client_secret", process.env.INSTAGRAM_API_SECRET)
        .field("grant_type", "authorization_code")
        .field("redirect_uri", process.env.NEXT_PUBLIC_FB_REDIRECT_URL)
        .field("code", code).then(response => {
            return response.body;
        }).catch(error => {
            throw error;
        })
}

async function getLongLiveAccessToken(token: string) {
    //get long lived access token
    return await unirest.get(`${process.env.INSTAGRAM_API_ENDPOINT}access_token`)
        .query({
            grant_type: "ig_exchange_token",
            client_secret: process.env.INSTAGRAM_API_SECRET,
            access_token: token
        }).then(response => {
            return response.body;
        }).catch(error => {
            throw error;
        })
}

async function refreshLongLiveAccessToken(token: string) {
    //get long lived access token
    return await unirest.get(`${process.env.INSTAGRAM_API_ENDPOINT}refresh_access_token`)
        .query({
            grant_type: "ig_refresh_token",
            access_token: token
        }).then(response => {
            return response.body;
        }).catch(error => {
            throw error;
        })
}

export default {getAccessTokenAndUserId, getLongLiveAccessToken, refreshLongLiveAccessToken};
