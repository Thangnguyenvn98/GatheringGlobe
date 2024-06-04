const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error('LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set in environment variables.');
}

// Payload for the JWT token
const payload = {
  "event": "room_started",
  "room": {
    "sid": "RM_hycBMAjmt6Ub",
    "name": "Demo Room",
    "emptyTimeout": 300,
    "creationTime": "1692627281",
    "turnPassword": "2Pvdj+/WV1xV4EkB8klJ9xkXDWY=",
    "enabledCodecs": [
      {
        "mime": "audio/opus"
      },
      {
        "mime": "video/H264"
      },
      {
        "mime": "video/VP8"
      },
      {
        "mime": "video/AV1"
      },
      {
        "mime": "video/H264"
      },
      {
        "mime": "audio/red"
      },
      {
        "mime": "video/VP9"
      }
    ]
  },
  "id": "EV_eugWmGhovZmm",
  "createdAt": "1692985556"
};

// Options for the JWT token
const options = {
  algorithm: "HS256",
  expiresIn: '1h' 
};

// Generate the JWT token
const token = jwt.sign(payload, 'APICfEjMqesqWVp', options);

console.log('Generated JWT Token:', token);