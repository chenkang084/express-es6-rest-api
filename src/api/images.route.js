import fs from 'fs'

export default (app) => {
    app.get('/download',(req,res)=>{
        var img = fs.readFileSync('public/favicon.ico');
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    })

    app.get('/test',(req,res)=>{
        var img = fs.readFileSync('public/test.js');
        res.writeHead(200, {'Content-Type': 'application/x-javascript' });
        res.end(img, 'binary');
    })
};
