const express = require('express')

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));

// setup home route
app.get('/', (req, res) => {
    res.render('index')
    res.end()
})

// setup api route
app.get('/api/timestamp/:date_string?', (req, res) => {


    // handle request parameter
    let param = req.params.date_string;
    if ( param == undefined ) param = ''; // param shouln't be undefinded

    // define regEx patterns for input date
    // utc: 0000-00-00
    // unix: 628021800000 -> 12 chars
    const utcRegx = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
    const unixRegx = /[0-9]{13}/g;

    /*================================================ 
        Handle Valid utc date
    ================================================*/
    // if param matchs utc time format and param is not empty
    if ( param != '' && param.match(utcRegx)) {

        // respond with a json object
        res.json( {
            "unix": new Date(param).getTime(),
            "utc": new Date(param).toUTCString()
        })
    }

    // handle valid unix date
    // if param matchs unix time format and param is not empty
    // the difference is, param is converted to integer
    else if ( param.match(unixRegx) && param != '') {
        res.json({
        "unix": new Date(parseInt(param)).getTime(),
        "utc": new Date(parseInt(param)).toUTCString()
        })
    }

     // handle empty param: DONE
    else if ( param == '' ) {
        
        res.json({
        "unix": new Date().getTime(),
        "utc": new Date().toUTCString()
        })
    }

    // handle Invalid Date
    else if ( !param.match(utcRegx) || !param.match(unixRegx) && param != '') {
        res.json({"error": "Invalid Date"})
    }



})

