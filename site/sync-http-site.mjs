import url from 'url'
//import toHttpResponse from '../api/response-errors.mjs'
//import errors from './../../errors.mjs'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function httpSiteInit(httpServices) {
    if (!httpServices) {
        throw new Error("httpServices module is required");
    }
    return {
        createUser: createUser,
    }

    async function createUser(req, rsp) {
        let newUser = await httpServices.createUser(req.body)
        return rsp.status(201).json(newUser);
    }

}