import Profile, {IProfile} from "../models/Profile";
import {v4} from 'uuid'

export default class ProfileController {

    public static async CreateProfile(userId: string, accessToken: string) {
        //create new api token
        const apiToken: string = v4();

        return await Profile.create({
            userId,
            accessToken,
            apiToken
        }).then((data: IProfile) => {
            return data;
        }).catch((error => {
            throw error;
        }))
    }

    public static async GetProfiles() {
        return await Profile.find().then((data) => {
            return data;
        }).catch((error => {
            throw error;
        }));
    }

    public static async GetProfileByUserId(userId) {
        return await Profile.find({userId: userId})
    }

    public static async GetProfileByToken(token: string) {
        return await Profile.find({apiToken: token})
    }

    public static async CheckProfileExists(filter: object){
        //check user exists with token
        return await Profile.exists(filter).then(result => {
            return result;
        }).catch(error => {
            throw error;
        });
    }

}
