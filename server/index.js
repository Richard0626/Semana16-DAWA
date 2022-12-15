const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const {mongoose} = require('./database');

// configuraciones
app.set('port',process.env.PORT || 3000)


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:4200' }));

//rutas
app.use('/api/comidas',require('./routes/comidas.routes'));
app.use('/api/comidas',require('./routes/auth.routes'));

// comenzar servidor

app.listen(app.get('port'), () => {
    console.log('server on port ',app.get('port'));
});