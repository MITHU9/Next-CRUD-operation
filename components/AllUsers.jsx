"use client";

import { Card, List, ListItem } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch("/api/users");
      const userInfo = await response.json();
      setUsers(userInfo.data);
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      {users &&
        users.map((user) => (
          <Card key={user.id} className="mb-3">
            <List>
              <ListItem>{user.name}</ListItem>
            </List>
          </Card>
        ))}
    </div>
  );
};
export default AllUsers;
