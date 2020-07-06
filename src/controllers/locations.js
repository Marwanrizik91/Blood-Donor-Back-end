const fs = require('fs');
const http = require("https");
const UserAgent = require('user-agents');

const userAgent = new UserAgent();
 
 


exports.getAllLocations = (req, res) => {
    
    // console.log();
    // console.log(JSON.stringify(userAgent.data, null, 2));

    let rawdata = "";
    try {
        rawdata = fs.readFileSync('src/database/locations.json');
        let locations = JSON.parse(rawdata);
        res.status(200).json(locations);
    } catch (e) {
        res.status(200).json(
            {
                "code": 500,
                "ok": false,
                "message": "error in reading file"
            }
        );
    }
}


exports.getLocationsIframe = (req, res) => {
    fetchLocations().then((result) => {
        res.status(200).render('locations', {
            // encodeURIComponent so later we can use the data in the script tag as a javascript value
            result: encodeURIComponent(JSON.stringify(result)),
            layout: 'locations-iframe'
        });
    })
}

exports.getAllLocationsFromServer = () => {


    fetchLocations().then((result) => {
        try {
            const jsonString = `{ "data" : ${JSON.stringify(result)} , "ok":${true}, "message":"", "code":${200} }`;
            fs.writeFile('src/database/locations.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        } catch (e) {

        }

    })
}

const body = {
    "RequestHeader": {
        "Application": 101,
        "Module": "BloodBank",
        "Function": "GetAllDetailsDonations",
        "Token": ""
    }, "RequestData": ""
}

let headers = {
    Accept: 'application/json, text/plain, */*',
};

if (body) {
    headers['Content-Type'] = 'application/json';
    headers['cookie'] = 'GCLB=CJSY9sTAh7WIhQE; rbzsessionid=2a9b60db124b2002c01afb275fb854c0; _ga=GA1.2.1892371988.1592293688; _gid=GA1.2.631777186.1592293688; _fbp=fb.1.1592293688005.696364955; __atssc=google%3B2; __atuvc=24%7C25; rbzid=x00OhQ0+4dhqF9wBpPwdsqICDEgkq7dE6i487ks+4WmlF5aJZXzc3Snnvwcy0kmQFJ71KYRGitbamZbqJWNEfjb9/wAuR3P2xZJ+PwmEsLkwWNyvX+GcNWRpvqWYXJ8feAg1wk3iB4251ElBM7F45TJngNjDoP28KE+Xw592PUOMmvOcpPwtATxWSl4QRfMfrW2Ximlfomldx1mO4PoNz00mGbvZXVT+7PPjEdz/2/tyDSM1HQMbdS3zuwAlJEm2YpjHuMEnP62kGbpe9eE6j7BFCJZO4qVQDI5XRcI4lQVxrFtZCNP/6NlQ+V2W62URILKDFyE27HlDyhnSMdkFKw==';
}

fetchLocations = () => new Promise(
    (resolve, reject) => {

        const options = {
            "method": "POST",
            "hostname": "www.mdais.org",
            "port": null,
            "scheme": "http",
            "path": "/umbraco/api/invoker/execute",
            "headers": {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "cookie": "GCLB=CJSY9sTAh7WIhQE; rbzsessionid=2a9b60db124b2002c01afb275fb854c0; _ga=GA1.2.1892371988.1592293688; _fbp=fb.1.1592293688005.696364955; __atssc=google%3B2; _gid=GA1.2.474835944.1592819432; rbzid=0TBhmOE820ArGr4ItiazDPOBPc9evHbIcro2K2EZ02Xx4X4v2FbHKXLuPQdi4q89XnGC/2mW3EWjYW16mSyXB+wilbnuqkDhkd/yiJGC5ZibiUR0FPnYFhI3u/wM95ggPbtpTU4KO6Fi9aVM2hVwB0+ZNokYKG3ibAlKljwK49N45kkXtCvaaGQcbBV8H1+S9fzlKt2m8Kyo5tSf9SWCoziWSbHYXFajWsygptQQ8HbdDjgm35VZ4db1SVrtfLdQ47OQqvZx0qiqKCvO8dXXEA==; __atuvc=25%7C25%2C6%7C26; __atuvs=5ef0a8db5474d3c4001",
                "origin": "https://www.mdais.org",
                "authority": "www.mdais.org",
                "accept-encoding": "json",
                "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7,ar-IL;q=0.6,ar;q=0.5",
                "content-length": "122",
                "referer": "https://www.mdais.org/blood-donation",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "MY IPHINE 7s"
            }
        };
        console.log(options);

        var req = http.request(options, function (res) {
            var chunks = "";
            res.on("data", function (chunk) {
                chunks += chunk.toString();
            });

            res.on("end", function () {
               console.log(chunks);
               
                // var obj = JSON.parse(chunks);
               // resolve(JSON.parse(obj.Result));
            });
        });

        req.write(JSON.stringify({
            RequestHeader:
            {
                Application: 101,
                Module: 'BloodBank',
                Function: 'GetAllDetailsDonations',
                Token: ''
            },
            RequestData: ''
        }));
        req.end();
    }
);


fetchLocations1 = () => new Promise(
    (resolve, reject) => {

        const options = {
            "method": "POST",
            "hostname": "www.mdais.org",
            "port": null,
            "scheme": "https",
            "path": "/umbraco/api/invoker/execute",
            "headers": {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "f6b4a7b0-2873-f2fe-18d7-241704b44b78",
                "cookie": "GCLB=CJSY9sTAh7WIhQE; rbzsessionid=2a9b60db124b2002c01afb275fb854c0; _ga=GA1.2.1892371988.1592293688; _fbp=fb.1.1592293688005.696364955; __atssc=google%3B2; _gid=GA1.2.474835944.1592819432; rbzid=0TBhmOE820ArGr4ItiazDPOBPc9evHbIcro2K2EZ02Xx4X4v2FbHKXLuPQdi4q89XnGC/2mW3EWjYW16mSyXB+wilbnuqkDhkd/yiJGC5ZibiUR0FPnYFhI3u/wM95ggPbtpTU4KO6Fi9aVM2hVwB0+ZNokYKG3ibAlKljwK49N45kkXtCvaaGQcbBV8H1+S9fzlKt2m8Kyo5tSf9SWCoziWSbHYXFajWsygptQQ8HbdDjgm35VZ4db1SVrtfLdQ47OQqvZx0qiqKCvO8dXXEA==; __atuvc=25%7C25%2C6%7C26; __atuvs=5ef0a8db5474d3c4001",
                "origin": "https://www.mdais.org",
                "authority": "www.mdais.org",
                "accept-encoding": "json",
                "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7,ar-IL;q=0.6,ar;q=0.5",
                "content-length": "122",
                "referer": "https://www.mdais.org/blood-donation",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
            }
        };


        var req = http.request(options, function (res) {
            var chunks = "";

            res.on("data", function (chunk) {
                chunks += chunk.toString();
            });

            res.on("end", function () {
                var obj = JSON.parse(chunks);

                resolve(JSON.parse(obj.Result));
            });
        });

        req.write(JSON.stringify({
            RequestHeader:
            {
                Application: 101,
                Module: 'BloodBank',
                Function: 'GetAllDetailsDonations',
                Token: ''
            },
            RequestData: ''
        }));
        req.end();
    }
);
