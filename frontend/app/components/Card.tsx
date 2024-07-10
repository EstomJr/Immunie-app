
import React from 'react';
import { User } from '../interface';

interface CardProps {
    handleImageClick: () => void;
    handleUpdateName: (name : string) => void;
    user: User
}


const Card: React.FC<CardProps> = ({ user, handleImageClick, handleUpdateName }) => {
    const [name, setName] = React.useState<string>(user.name);
    const handleKeyDown = async(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
         await handleUpdateName(name);
        }
    };
    const handleNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      await setName(event.target.value);
    }

  return (
      <div className={" w-[320px]  md:w-[400px]  bg-gray-100 border-2 border-black flex flex-col rounded-[38px]"}>
    <div className={"flex flex-col items-center border-b-2 border-black py-5"}>
      <img className={"w-[240px] "} src="https://immunie.s3.eu-west-1.amazonaws.com/logo_passe_verde_green_f0ddd7933b.svg" alt="Passe Verde" />
    </div>

       <div className="gap-8 p-4 flex flex-col items-center pt-14 pb-28" >
      <div className=" w-36 h-36 overflow-hidden rounded-[25px] border-8 border-green-400 " >
        <img  className={"w-full h-full cursor-pointer" } src={user.photo} alt={user.photo} onClick={handleImageClick} title='Alterar imagem' />
      </div>
      <div className= 'flex flex-col items-center '>
      <p className='text-gray-700 font-semibold'>Nome</p>
      <input className={" bg-transparent font-bold text-black text-2xl text-center"} title='Alterar nome' value={name} onKeyDown= {handleKeyDown} onChange={handleNameChange}/>
      </div>
      <div className={"text-gray-700 font-semibold text-lg flex flex-col items-center"}> 
        <p className='text-sm'>Acesso Válido até</p> 
        <p className='text-green-500 text-2xl font-bold'>{user.validUntil}</p>
      </div>
    </div>
   </div>
  );
};

export default Card;
