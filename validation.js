const router = require("express").Router();
const { access_key } = require("../../config");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/validate", async (req, res) => {

  try {
    const hhtp_url = "http://apilayer.net/api/validate?access_key=" + access_key + "&number=" + req.body.phoneNumber;
    const resl = await fetch(hhtp_url);
    const headerDate = resl.headers && resl.headers.get('date') ? resl.headers.get('date') : 'no response date';
    console.log('Status Code:', resl.status);
    console.log('Date in Response header:', headerDate);

    const result = await resl.json();
    
      console.log(`Got user with id: ${result.valid}, name: ${result.country_code}`);
      if(result.valid == false){
        return res.status(400).json({
          message: "Invalid input",
          success: false,
        });
      }
      else{
        return res.status(200).json({
          message: `Successfully validate`,
          success: true,
          result,
        });
      }
  } catch (err) {
    console.log(err.message); //can be console.error
  }


});

module.exports = router;
