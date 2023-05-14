import nodemailer from "nodemailer";
import { google } from "googleapis";


export const transport = async (mailOpt) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.oAuth2_CLIENT_ID,
    process.env.oAuth2_CLIENT_SECRECT,
    process.env.oAuth2_RIDERECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.oAuth2_REFRESH_TOKEN,
  });
  const accessToken = await oAuth2Client.getAccessToken()
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "sufiyanbmk01@gmail.com",
      clientId: process.env.oAuth2_CLIENT_ID,
      clientSecret: process.env.oAuth2_CLIENT_SECRECT,
      refreshToken: process.env.oAuth2_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const result = await transport.sendMail(mailOpt);
  console.log(result,'transport')
  return result;
};
