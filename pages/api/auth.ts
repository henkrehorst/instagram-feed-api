import {NextApiRequest, NextApiResponse} from 'next';
import AuthService from "../../lib/services/AuthService";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    const code = req.query['code'];
    if (typeof code === "string") {
        res.end(JSON.stringify({api_token: await AuthService.finishAuth(code)}))
    }
}
