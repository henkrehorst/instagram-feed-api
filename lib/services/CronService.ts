import ProfileController from "../controllers/ProfileController";
import MongooseConnect from "../../lib/helpers/MongooseConnect";
import InstagramAuthService from "./InstagramAuthService";
//start mongodb connection
MongooseConnect();

async function refreshTokensCron() {
    let profiles = await ProfileController.GetProfiles();
    //renew access token for each profile
    for (let profile of profiles) {
        //get new access token
        const result = await InstagramAuthService.refreshLongLiveAccessToken(profile.accessToken);
        //update access token in profile
        profile.accessToken = result.access_token;
        await profile.save();
    }
}

export default {refreshTokensCron};

