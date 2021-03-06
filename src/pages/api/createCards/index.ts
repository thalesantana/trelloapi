import { NextApiRequest, NextApiResponse } from 'next'



export default async function(req: NextApiRequest, res: NextApiResponse){
  return new Promise(async resolve => {
    try {
      const {method} = req;
      switch (method) {
        case 'POST':
          const {name, idList,email,text} = req.body;

          const createCard = async () =>{
            const response = await fetch(`https://api.trello.com/1/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&idList=${idList}&name=${name}&email=${email}`, {
              method: 'POST'
              })
              return response.json();
          }

          const createComment = async () => {
            try{
              const data = await createCard()
              await fetch( `https://api.trello.com/1/cards/${data.id}/actions/comments?key=73af314f1d4579f0ffe6c3604190583c&token=22edae9d846384150bd3822e9067927b8e643c16ee09aa153efc167ad09b3aa2&text=${text}`,{
                method: 'POST'
              })
              resolve(res.status(200).json(data))
            }
            catch(err){ 
              console.error(err)
              return res.status(400).send(err)
          }; 
          }  
          createComment(); 
        break;
        
        default:
          res.setHeader('Allow', ['POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  })
}

