"use client";

import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

const UpdateUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !age || !name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("User updated successfully");
        setId("");
        setAge("");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Failed to update user");
        return;
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          label="Enter User Id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Input
          label="Enter User Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mt-3" type="submit">
          Update User
        </Button>
      </form>
    </div>
  );
};
export default UpdateUser;
