const users = [];

// Helper functions
const addUser = ({ id, Name, Room }) => {
  Name = Name.trim().toLowerCase();
  Room = Room.trim().toLowerCase();

  const existingUser = users.find(user => {
    user.Room === Room && user.Name === Name;
  });

  if (existingUser) {
    return { erorr: "user Name is taken" };
  }

  const user = { id, Name, Room };
  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => {
    user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);
const getUsersInRoom = Room => {
  users.filter(user => {
    user.Room === Room;
  });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
