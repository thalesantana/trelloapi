import { NextApiRequest, NextApiResponse } from 'next'


const handler = (req: NextApiRequest, res: NextApiResponse) => {
 
  try {
    const {method} = req;
    switch (method) {
      case 'POST':
        const {name, idList,email} = req.body;
        fetch(`https://api.trello.com/1/cards?key=73af314f1d4579f0ffe6c3604190583c&token=22edae9d846384150bd3822e9067927b8e643c16ee09aa153efc167ad09b3aa2&idList=${idList}&name=${name}&email=${email}`, {
            method: 'POST'
            })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                return res.status(200).json(data)
                })
            .catch(err =>{ 
                console.error(err)
                return res.status(400).send(err)
            }); 
        break;
      
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
