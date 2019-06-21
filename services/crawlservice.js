
let axios = require('axios'),
cheerio = require('cheerio');

const https = require('https');
var _ = require('lodash');

const agent = new https.Agent({
    rejectUnauthorized: false
});

module.exports = {
    crawlData: function(actionData, callback){
        var result = [];
        axios.get(actionData.url, { httpsAgent: agent }).then(function (html) {
            //console
            let $ = cheerio.load(html.data);
            _.each(actionData.parsing, function(data){
                var resu = {
                    parsetxt: data.parsetxt,
                    value: ''
                }
                //console.log(data.selector);
                resu.value= $(data.selector).html();
                console.log(resu.value);
                result.push(resu);
            })
            callback(result);

    }).catch(function (error) {
        console.log(error)
      callback(error);
    });

       //callback(fbresponse);
   }
}