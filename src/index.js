
const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const body_parser = require('body-parser');
const router  = require('./routers/routecontroller').router;
// app.use(express.json());
app.use(body_parser.urlencoded({ extended : false }));
app.use(body_parser.json());
app.use('/api', router);
app.use('/*', (req, res) => {
    res.statusCode = 404;
    res.join({ msg:'something went wrong' });
});
app.use((err, req, res, next) => {
    if (err) {
        res.statusCode = 500;
        res.json({ msg:'some error has occured' });
    }
    next();
});
app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
});
