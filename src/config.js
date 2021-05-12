const config = {
  s3: {
    REGION: "sa-east-1",
    BUCKET: "cupido-online-upload",
  },
  apiGateway: {
    REGION: "sa-east-1",
    ULR: "https://x3r48gjdoe.execute-api.sa-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "sa-east-1",
    USER_POOL_ID: "sa-east-1_oZtg86jVa",
    APP_CLIENT_ID: "27vlc2dl7hfga5fgc3sq5s0831",
    IDENTITY_POOL_ID: "sa-east-1:46ee6769-6e42-44ab-914e-07063802ef7c",
  },
};

export default config;
