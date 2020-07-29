import {NextApiRequest, NextApiResponse} from 'next';
import CronService from "../../../lib/services/CronService";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await CronService.refreshTokensCron();
    res.status(200).json({status: 'tokens updated'});
}
