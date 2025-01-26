import { request } from 'express';
import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SCRECT } from "@repo/backend-comman/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
  const url=request.url
  if(!url){
    return;
  }
  const queryparams=new URLSearchParams(url.split("?")[1]).get('token')||" "
  // const token=queryparams.get('token') || " "
  const decoded=jwt.verify(queryparams,JWT_SCRECT)

  if (!decoded ||!(decoded as JwtPayload ).userId){
    ws.close()
    return;

  }

});