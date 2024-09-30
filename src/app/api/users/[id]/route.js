import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

//Fetch Specific Users
export async function GET(_, res) {
  const { id } = await res.params;
  const user = users.filter((user) => user.id === id);
  return NextResponse.json({ user });
}

//Login
export async function POST(req, res) {
  let { name, email, password } = await req.json();
  const { id } = await res.params;
  //console.log(id);

  const {
    name: uName,
    email: uEmail,
    password: uPassword,
  } = users.find((user) => user.id === id);

  if (!name || !email || !password) {
    return NextResponse.json({
      result: "Please fill all required fields",
    });
  } else if (uName === name && uEmail === email && uPassword === password) {
    return NextResponse.json({
      result: "Successfully logged in",
    });
  } else {
    return NextResponse.json({
      result: "Invalid credentials",
    });
  }
}

//delete user
export async function DELETE(_, res) {
  const { id } = await res.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return NextResponse.json({
      result: "User not found",
      status: 404,
    });
  } else {
    users.splice(index, 1);
    const updatedUsers = users;

    const updatedUsersData = JSON.stringify(updatedUsers, null, 2);

    fs.writeFileSync(
      "./src/app/util/db.js",
      `export const = ${updatedUsersData};`,
      "utf-8"
    );

    return NextResponse.json({
      result: "User deleted successfully",
    });
  }
}
