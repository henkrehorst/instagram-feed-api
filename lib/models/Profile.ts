import mongoose, {Document, Schema} from "mongoose";

export interface IProfile extends Document {
    userId: string;
    accessToken: string;
    apiToken: string;
}

const ProfileSchema: Schema = new Schema({
    userId: {type: String, required: true},
    accessToken: {type: String, required: true},
    apiToken: {type: String, required: true}
})

let model;

//TODO remove this workaround and solve this correctly
try {
    model = mongoose.model<IProfile>('profiles');
} catch (e) {
    model = mongoose.model<IProfile>('profiles', ProfileSchema);
}

export default model;
