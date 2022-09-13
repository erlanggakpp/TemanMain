const express = require('express')
const app = express()
const port = 4000
const { RtcTokenBuilder, RtcRole } = require('agora-access-token')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/rtctoken", (req, res) => {
  const appID = "9046360bacb641249331f2077a1938b2";
  const appCertificate = "d2601cd43ea54c98b5ea698a277c806c";
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
  res.send({ uid, token });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})