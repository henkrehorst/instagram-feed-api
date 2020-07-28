import ProfileController from "../controllers/ProfileController";
import MongooseConnect from "../../lib/helpers/MongooseConnect";
import InstagramGraphService from "./InstagramGraphService";
//start mongodb connection
MongooseConnect();

async function getUserMedia(token: string): Promise<object> {
    //check user exists with token
    if (await ProfileController.CheckProfileExists({apiToken: token})) {
        //get access token by user
        const accessToken = (await ProfileController.GetProfileByToken(token))[0].accessToken;
        //get posts with accessToken
        return {posts: (await InstagramGraphService.getMedia(accessToken))};

    } else {
        return {error: "incorrect token🍺!"}
    }
}

export default {getUserMedia};
