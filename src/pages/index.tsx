import { GetServerSideProps } from 'next';
import Head from 'next/head'
import styles from '../styles/style.module.css'
import {List} from '../interfaces'
import axios from 'axios';
import { useForm } from 'react-hook-form'


type Props = {
  items: List[]
}

export default function Home({items}: Props){
  const { register, handleSubmit, errors, reset } = useForm();
  async function onSubmitForm(values: JSON){
    try{
      const response = await axios({
        method:'POST',
        url:'http://localhost:3000/api/createCards',
        headers:{
          'Content-Type': 'application/json',
        },
        data: values,
      });
      if(response.status == 200){
        reset()
      }
    }catch(err){
      console.log(err)
    }
  }

  return(
    <form action="POST" onSubmit={handleSubmit(onSubmitForm)}>

      <div className={styles.container}>
        <Head>
            <title>Trello API | Create Card</title>
        </Head>

        <div className={styles.column}>
            <div className={styles.divInput}>
              <label className={styles.title}>Name</label>
                <input 
                className={styles.inputLeft} 
                type="text" 
                name="name"  
                ref={register({
                  required:{
                    value:true,
                    message:'You must enter the card name'
                  },
                  maxLength:{
                    value:16384,
                    message: "You name can't be more than 16384 characters"
                  }
                })} 
                placeholder="Insert the card name"
                />
                 <span className={styles.error}>{errors?.name?.message}</span>
          </div>
         
          
          <div className={styles.checkbox}>
              <div>
                <input type="checkbox"  name="option1" />
                <label>Opção 1</label>
              </div>
              <div>
                <input type="checkbox"  name="option2" />
                <label>Opção 2</label>
              </div>
              <div>
                <input type="checkbox"  name="option3" />
                <label>Opção 3</label>
              </div>
          
            </div>
          
        </div>

    
        <div className={styles.column}>
          <div className={styles.divInput}>
              <label className={styles.title}>E-mail</label>
              <input 
                  className={styles.inputLeft} 
                  type="email" 
                  name="email"  
                  ref={register({
                    required:{
                      value:true,
                      message:'You must enter your Trello email adress'
                    },
                    minLength:{
                      value:8,
                      message: "This is not long enough to be an e-mail"
                    },
                    maxLength:{
                      value:120,
                      message:'This is too long'
                    },
                  })} 
                  placeholder="exemple@mail.com"
              />
              <span className={styles.error}>{errors?.email?.message}</span>
          </div>
          
          <div>
            <label className={styles.title}>Select a list to put your card</label>
            <select className={styles.selectInput}  name="idList" ref={register}>
              {items.map((item)=> (
                <option key={item.id}  value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          
        </div>

        <div className={styles.column}> 
          <div >
            <input 
              disabled
              type="text" 
              name="text" 
              className={styles.inputLabel}
              placeholder="Type a comment.."
            />
          </div>

          <div className={styles.divButton}>
            <div className={styles.tags}>

            </div>
            <button className={styles.button} type="submit">Enviar</button>
          </div>
        </div>        
          
      </div>

    </form>

  )
};

export const getServerSideProps: GetServerSideProps = async () =>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards`);
  const items: List[] = await response.data;
  return {props: {items}}
};

