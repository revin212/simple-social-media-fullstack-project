import jwt from "jsonwebtoken";

export const veryfyToken = (req, res, next) => {
    const autheader = req.headers['authorization'];
    const token = autheader && autheader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403);
        req.username = decoded.username;
        next();
    })
}
