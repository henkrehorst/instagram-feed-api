import InstagramAuthService from "./InstagramAuthService";
import ProfileController from "../controllers/ProfileController";
import MongooseConnect from "../../lib/helpers/MongooseConnect";
//start mongodb connection
MongooseConnect();

async function finishAuth(code: string) {
    //transfer code to accessToken
    const accessResponse = await InstagramAuthService.getAccessTokenAndUserId(code);

    if(await ProfileController.CheckProfileExists({userId: accessResponse.user_id})){
        //get api token by user id
        return (await ProfileController.GetProfileByUserId(accessResponse.user_id))["0"].apiToken;
    }else{
        //get long lived accessToken
        const accessTokenResponse = await InstagramAuthService.getLongLiveAccessToken(accessResponse.access_token);

        //save access token and users id
        let profile = await ProfileController.CreateProfile(accessResponse.user_id, accessTokenResponse.access_token);

        //return api token
        return profile.apiToken;
    }
}

export default {finishAuth};
