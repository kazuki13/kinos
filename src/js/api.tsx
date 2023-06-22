import { useState,useEffect }  from 'react';
import { db } from './db';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';


type User = {
  id: number;
  email: string;
  age: number;
  admin: boolean;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const { register,
          handleSubmit,
          watch,
          formState: { errors }
        } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log('onSubmit', data);
    const usersCollectionRef = collection(db, 'users');
    const documentRef = addDoc(usersCollectionRef, {
      id: data.id,
      email: data.email,
      age: data.age,
      admin: false,
    });
    console.log(documentRef);
  };
  
  useEffect(() => {
    let userList: User[] = [];
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const user: User= {
          id: doc.data().name,
          email: doc.data().email,
          age: doc.data().age,
          admin: doc.data().admin,
        };
        userList.push(user);
      });
      setUsers(userList);
    });
    return unsub;
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>id</label>
          <input defaultValue="test" {...register('id')} />
        </div>
        <div>
          <label>名前</label>
          <input defaultValue="test" {...register('age')} />
        </div>
        <div>
          <label>メールアドレス</label>
          <input defaultValue="test" {...register('email')} />
        </div>
        {errors.id && (
          <span>Error!!!</span>
        )}
        <input value="登録" type="submit" />
      </form>
      <div>
        {users.map((user, index) => (
          <div key={index.toString()}>{user.id}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
