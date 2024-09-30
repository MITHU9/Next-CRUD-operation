"use client";

import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";
import { useState } from "react";

const SpecificUser = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchSpecificUser = async () => {
    const response = await fetch(`/api/users/${userId}`);
    console.log(response);

    if (response.ok) {
      const userInfo = await response.json();
      setUserData(userInfo.user);
    } else {
      console.log("error fetching user data");

      setUserData(null);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-72">
          <Input
            label="Enter User Id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <Button className="ml-4" onClick={fetchSpecificUser}>
          Fetch User
        </Button>
      </div>
      {userData ? (
        userData.map((user) => (
          <>
            <Card className="mt-4 w-96">
              <List>
                <ListItem>ID: {user.id}</ListItem>
                <ListItem>Name: {user.name}</ListItem>
                <ListItem>Age: {user.age}</ListItem>
                <ListItem>Email: {user.email}</ListItem>
                <ListItem>Password: {user.password}</ListItem>
              </List>
            </Card>
          </>
        ))
      ) : (
        <p>Search for specific user</p>
      )}
    </div>
  );
};
export default SpecificUser;
