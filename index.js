const express = require('express');

const app = express();
const bodyParser = require('body-parser')
const request = require('request')

const apiKey = 'ed2c3e9476cb7c8e1d3950907751ae88'

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


    request(url, (err, response, body) => {
        if (err) {
            res.render('index', { weather: null, error: "This is wrong, you need to fix this." })
        } else {

            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: "This is wrong, you need to fix this." })
            } else {
                let message = `It is ${weather.main.temp} degrees outside in ${weather.name}.`;
                res.render('index', { weather: message, error: null })
            }
        }
    })

})



const port = 3001;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})