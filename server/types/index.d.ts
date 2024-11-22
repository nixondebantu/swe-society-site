interface JWTPAYLOAD {
  userid: number;
  regno: string;
}
namespace Express {
  interface Request {
    jwtPayload: JWTPAYLOAD;
  }
}
