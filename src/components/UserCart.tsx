'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { fetchUsers } from "@/redux/features/userSlice";
import getUsers from "@/libs/Users/getUsers";
import { User } from "../../interfaces";
import banUser from "@/libs/Users/banUser";
import unbanUser from "@/libs/Users/unbanUser";
import deleteUser from "@/libs/Users/deleteUser";
import { banUser as banUserRedux } from "@/redux/features/userSlice";
import { unbanUser as unbanUserRedux } from "@/redux/features/userSlice";
import { removeUser } from "@/redux/features/userSlice";


const UserCart = () => {

    const dispatch = useDispatch<AppDispatch>();

    const userArr = useSelector((state: RootState) => state.user.user)

    const router = useRouter();
    
    const { data:session } = useSession();
    const token = session?.user.token;
    const role = session?.user.role;
    
    if(role != 'admin'){
        router.push('/auth/signin')
    }

    const handleBan = async (id:string) => {
        if(id && token){
            const response = await banUser(id,token);
            if(response.success){
                dispatch(banUserRedux(id));
            }
        }
    }

    const handleUnBan = async (id:string) => {
        if(id && token){
            const response = await unbanUser(id,token);
            if(response.success){
                dispatch(unbanUserRedux(id));
            }
        }
    }

    const handleDelete = async (id:string) => {
        if(id && token){
            const response = await deleteUser(id,token);
            if(response.success){
                dispatch(removeUser(id));
            }
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            if(token){
                const response = await getUsers(token);
                dispatch(fetchUsers(response.data));
            }
            else{
                console.log("No token found");
            }
        }
        fetchUser();
    },[]);

    if(userArr.length == 0){
        return <div>Loading...</div>
    }

    const normalUser:User[] = [];
    const bannedUser:User[] = [];
    userArr.forEach((user) => {
        if(user.isBan){
            bannedUser.push(user);
        }
        else{
            normalUser.push(user);
        }
    })

    return (
        <>
            <div className="text-left flex flex-col flex-wrap">
                <h1 className="mb-2 font-semibold text-xl">Normal User</h1>
                {
                    normalUser.map((user:User) => (
                        <section className="flex bg-slate-800 p-2 mb-3">
                            <div className="my-auto ml-2">
                                <div>Name : {user.name}</div>
                                <div>Email : {user.email}</div>
                                <div>Tel : {user.telephone}</div>
                                <div>Role : {user.role}</div>
                            </div>
                            <div className="ml-auto">
                                <button className="w-full block p-2 mb-2 bg-slate-900 mr-2 ease duration-150 hover:bg-slate-700"
                                onClick={(e) => (handleDelete(user._id))}
                                >Delete</button>
                                {
                                    user.role != 'admin' ?
                                    <button 
                                    className="w-full block p-2 bg-slate-900 mr-2 ease duration-150 hover:bg-slate-700"
                                    onClick={(e) => (handleBan(user._id))}
                                    >Ban</button>
                                    :
                                    null 
                                }

                            </div>
                        </section>
                    ))
                }
            </div>
            <div className="text-left flex flex-col flex-wrap">
            <h1>Banned User</h1>
            {
                    bannedUser.map((user:User) => (
                        <section className="flex bg-slate-800 p-2 mb-3">
                            <div className="my-auto ml-2">
                                <div>Name : {user.name}</div>
                                <div>Email : {user.email}</div>
                                <div>Tel : {user.telephone}</div>
                                <div>Role : {user.role}</div>
                            </div>
                            <div className="ml-auto">
                                <button className="w-full block p-2 mb-2 bg-slate-900 mr-2 ease duration-150 hover:bg-slate-700"
                                onClick={(e) => (handleDelete(user._id))}
                                >Delete</button>
                                <button 
                                    className="w-full block p-2 bg-slate-900 mr-2 ease duration-150 hover:bg-slate-700"
                                    onClick={(e) => (handleUnBan(user._id))}
                                    >UnBan</button>
                            </div>
                        </section>
                    ))
                }
            </div>
        </>
    )
}

export default UserCart