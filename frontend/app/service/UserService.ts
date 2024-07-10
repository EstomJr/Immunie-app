import { env } from "../../environments";
import { User } from "../interface";


export default class UserService {

    async getUser(id: number) {
        return fetch(env.NEXT_PUBLIC_URL + `users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',}
            })
}

    async createUser(name: string, photo: File) :Promise<User> {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('name', name);
        try {
            const response = await fetch(env.NEXT_PUBLIC_URL + `users`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const data = await response.json();
            return data as User;
        } catch (error) {
            console.error('Error creating user:', error);
            return {} as User
        }
    }

    async updatePhoto (id: string, file: File) :Promise<User> {
        const formData = new FormData();
        formData.append('photo', file);
        try {
          const response = await fetch(env.NEXT_PUBLIC_URL + `users/${id}/photo`, {
            method: 'PUT',
            body: formData,
          });
          console.log(response);
          const data = await response.json();
          return data as User;
        } catch (error) {
          console.error('Error uploading photo:', error);
          return {} as User
        }
      };

      async updateUserName (id: string, name: string) :Promise<User> {
        try {
          const response = await fetch(env.NEXT_PUBLIC_URL + `users/${id}/name`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: `{"name": "${name}"}`,
          });
          const data = await response.json();
          return data as User;
        } catch (error) {
          console.error('Error uploading photo:', error);
          return {} as User
        }
      };


}

    
