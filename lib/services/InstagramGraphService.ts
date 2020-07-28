import unirest from 'unirest';

async function getMedia(accessToken: string) {
    //get user media
    return await unirest.get(`${process.env.INSTAGRAM_API_ENDPOINT}me/media`)
        .query({
            fields: ["id", "media_url", "permalink"].join(),
            access_token: accessToken
        }).then(response => {
            return response.body.data;
        }).catch(error => {
            throw error;
        })
}

export default {getMedia}
