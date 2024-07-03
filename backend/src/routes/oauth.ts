import express, {Request, Response} from "express"
import User, { UserType } from "../models/user";
import jwt from "jsonwebtoken";
import {ALL} from "dns";
import cookie from "cookie"

const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

async function getUserData(access_token: string) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  console.log('data' ,data);
  return data
}

/* GET home page. */
router.get('/', async function(req: Request, res: Response, next) {

    const code = req.query.code;

    console.log(code);
    try {
        const redirectURL = "http://127.0.0.1:5050/api/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.', r.token);
        // const userCredentials = oAuth2Client.credentials;
        // console.log('credentials',userCredentials);
        const userData = await getUserData(oAuth2Client.credentials.access_token);
        
        let user = await User.findOne({ email: userData.email });
        if (!user) {
        // Create a user if they do not exist
        user = await User.create({
            email: userData.email,
            username: `${userData.given_name} ${userData.family_name}`,
        });
        }

        // Generate a JWT token

        const token: string = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            {
              expiresIn: "1d",
            }
        );


        console.log("token from jwt", token)
        // res.cookie("auth_token", token, {
        //   // secure: process.env.NODE_ENV === "production",
        //   secure: false,
        //   maxAge: 86400000,
        //   // domain: "localhost",  // Make sure this matches the domain used in the redirect URL
        //   path: "/",  // Adjust if necessary based on your application's path structure
        //   sameSite: "none",  // Only needed for cross-site requests in some modern browsers
        // });   
        
        res.setHeader(
          'Set-Cookie',
           cookie.serialize("auth_token", token, { // XSRF-TOKEN is the name of your cookie
             sameSite: false, // lax is important, don't use 'strict' or 'none'
             httpOnly: false, // must be true in production
             path: "/",
             secure: false, // must be true in production
             maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
             domain: 'localhost' // the period before is important and intentional
           })
        )
         
        console.log(cookie.parse('Set-Cookie'))

        res.redirect(303, 'http://localhost:5173/');

      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }  

});

export default router;