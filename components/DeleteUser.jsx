"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const DeleteUser = () => {
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully");
        setId("");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Enter User Id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Button className="mt-2" type="submit">
          Delete User
        </Button>
      </form>
    </div>
  );
};
export default DeleteUser;
