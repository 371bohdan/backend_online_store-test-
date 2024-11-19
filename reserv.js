const express = require('express');



app.use(express.json)

app.get('/', (req, res)=> {
    res.status(200).json({message: 'success'});
});





const PORT = 3000;



app.listen(PORT, () => {
    console.log(`This server run on http://localhost:${PORT}`);
});


