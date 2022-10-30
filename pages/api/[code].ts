import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

const Index = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    let code = `${req.query.code}`
    const url = await prisma.uRL.findUnique({
      where: {
        code
      },
    })
    if (!url) {
      res.writeHead(302, { Location: "/error" });
      res.end();
    }else{
      res.writeHead(302, { Location:url.url });
      res.end();
    }
  } catch (error) {
    res.writeHead(302, { Location: "/error" });
    res.end();
  }
}

export default Index