import { NextApiRequest, NextApiResponse } from 'next'

export default async function(req: NextApiRequest, res: NextApiResponse){
  return new Promise(resolve => {
    try {
      const {method} = req;
      switch (method) {
        case 'GET':
          fetch('https://api.trello.com/1/boards/QRd8atbf/lists', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
              })
              .then(response => {
                  return response.json();
              })
              .then((data) => {
                
                  resolve(res.status(200).json(data));
                  })
              .catch(err =>{ 
                  console.error(err)
                  return res.status(400).send(err);
              })            
          break;
        
        default:
          res.setHeader('Allow', ['GET'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  })
}


