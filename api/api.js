const express = require('express');
const Device = require('./models/device');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://defaultUser:defaultPassword@cluster0.e0ode.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 5000;

/**
 *  @api {get} Test Page testing functionality of API
 *  @apiSuccessExample {json} Success-Response:
 *  {
 *      "The API is working!"
 *  }
 *  @apiErrorExample {json} Error-Response:
 *  {
 *      "app crashed - waiting for file changes before starting..."
 *  }
 */


app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

/**
 *  @api {post} /api/devices Devices Add new post to device list
 *  @apiSuccessExample {json} Success-Response:
 *  {
 *      "Post successful"
 *  }
 *  @apiErrorExample {json} Error-Response:
 *  {
 *      "Post unsuccessful"
 *  }
 */

app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    });
});

/**
 *  @api {get} /public/generated-docs/index.html A log of device history
 *  @apiSuccessExample {json} Success-Response:
 *  {
 *      {Device History}
 *  }
 *  @apiErrorExample {json} Error-Response:
 *  {
 *      "File not found"
 *  }
 */

app.use(express.static(`${__dirname}/public`));
app.get('/docs', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
 * @api {get} /api/devices AllDevices An array of all devices
 * @apiGroup Device
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *          "_id": "dsohsdohsdofhsofhosfhsofh",
 *          "name": "Mary's iPhone",
 *          "user": "mary",
 *          "sensorData": [
 *              {
 *                  "ts": "1529542230",
 *                  "temp": 12,
 *                  "loc": {
 *                      "lat": -37.84674,
 *                      "lon": 145.115113
 *                  }
 *              },
 *              {
 *                  "ts": "1529572230",
 *                  "temp": 17,
 *                  "loc": {
 *                      "lan": -37.850026,
 *                      "lon": 145.117683
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * @apiErrorExample {json} Error-Response:
 *  {
 *      "User does not exist"
 *  }
 */

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (err == true) {
            return res.send(err);
        } else {
            return res.send(devices);
        }
    });
});

/**
 *  @api {listen} Port Start api on given port
 *  @apiSuccessExample {terminal} Success-Response:
 *  {
 *      "listening on port {port}"
 *  }
 *  @apiErrorExample {terminal} Error-Response:
 *  {
 *      "app crashed - waiting for file changes before starting..."
 *  }
 */

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});