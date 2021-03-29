import { NextApiRequest, NextApiResponse } from 'next'


const handler = (req: NextApiRequest, res: NextApiResponse) => {
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
                return res.status(200).json(data);
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
}

export default handler
