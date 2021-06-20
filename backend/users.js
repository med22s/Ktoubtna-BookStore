const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) =>user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };

  if(!existingUser){
    const user = { id, name, room };

    users.push(user);
  
    return { user };
  }

  if(existingUser && room!==existingUser.room){
    return {msg:'room has been changed !',userChanged:existingUser}
    //return {error:'logout user from room'}
  }

  
  return {user:existingUser}


}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };