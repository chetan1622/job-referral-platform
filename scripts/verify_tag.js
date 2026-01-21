const https = require("https");

const url = "https://job-referral-platform-new.vercel.app/";

https
  .get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      if (data.includes("Y0ak8w4wZSE8fXI_IFFvXC9qBZLMNEFIqjGL6OPwk3U")) {
        console.log("VERIFICATION_FOUND");
      } else {
        console.log("VERIFICATION_NOT_FOUND");
        // Print what IS there
        const match = data.match(/google-site-verification" content="([^"]+)"/);
        if (match) {
          console.log("FOUND_INSTEAD: " + match[1]);
        }
      }
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
