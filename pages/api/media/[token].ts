import {NextApiRequest, NextApiResponse} from 'next';
import MediaService from "../../../lib/services/MediaService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    //get token from url
    const {query: {token}} = req;

    if (typeof token === "string") {
        const result = await MediaService.getUserMedia(token);
        res.status("error" in result ? 404 : 200).json(result);
    }
}
