'use client';
import React, { useState, useRef } from 'react';
import UserService from './service/UserService';
import Card from './components/Card';
import calculateValidUntil from './utils/calculateValidUntil';
import { User } from './interface';


const userService = new UserService();

const Home = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      if(user){
        const validUntil = calculateValidUntil();
        const response: User = await userService.updatePhoto(user._id, event.target.files[0])
       setUser({...user, photo: response.photo, validUntil});
      console.log(response);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (selectedFile) {
      setIsSending(true);
     const response: User = await userService.createUser(name, selectedFile);
     const validUntil = calculateValidUntil();
     setIsSending(false);
     setUser({...response, validUntil});     
    }
  };

  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handleUpdateName = async (name: string) => {
    if(user){
      const validUntil = calculateValidUntil();
      const response: User = await userService.updateUserName(user._id, name)
     setUser({...user, name: response.name, validUntil});
     console.log(response);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${user ? 'hidden' : ''}`}>
        <div className='flex flex-col items-center'>
          <img className={"px-0 py-2 w-[300px]"} src="https://immunie.s3.eu-west-1.amazonaws.com/logo_passe_verde_green_f0ddd7933b.svg" alt="Passe Verde" />
        </div>
        <p className='text-lg font-semibold text-black flex flex-col items-center p-4'> Cadastrar novo usuario</p>
      <input
        className="text-black border-2 border-gray-400  rounded-full py-2 px-4"
        type="text"
        placeholder="Digite seu nome"
        onChange={(event) => setName(event.target.value)}
      />
      <a className='text-black font-semibold flex flex-col items-center'> Selecione uma foto </a>
      <div className='rounded-full border-2 border-gray-400 py-0 px-2'>
        <input className=" text-black py-2" ref={imgRef} type="file" onChange={handleFileChange} />
      </div>
      <button className='bg-green-600 text-white rounded-full py-3' type="submit">
        {isSending ? 'Enviando...' : 'Criar'}
      </button>
    </form>
      {user?.photo && (
        <Card user={user} handleImageClick={handleImageClick} handleUpdateName={handleUpdateName} />
      ) 
    }
    </div>
  );
};

export default Home;
