const userItems = [
  {
    user_id: 3609,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 3602,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@metropolia.fi",
    role: "admin",
    password: "password123",
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) => userItems.find((item) => item.user_id == id);

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems.length > 0 ? userItems[0].user_id + 1 : 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return { user_id: newId };
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE username = ?",
    [username],
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  removeUser,
};
