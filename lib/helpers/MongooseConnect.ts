import mongoose from "mongoose";
import * as process from "process";

export default () => {
    const connection = () => {
        mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING,
            {useNewUrlParser: true, useUnifiedTopology: true}
        ).then(() => {
            return console.info("Mongodb connection successfully created");
        }).catch(error => {
            console.error("error")
            return process.exit(1);
        })
    }
    connection();

    mongoose.connection.on('disconnected', connection);
}
