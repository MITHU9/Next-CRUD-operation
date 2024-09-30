import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

//Fetch all data
export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

//create a new user
export async function POST(req, res) {
  let { id, name, email, password } = await req.json();

  if (!id || !name || !email || !password) {
    return NextResponse.json({
      result: "required field not provided",
      status: 400,
    });
  } else {
    users.push({
      id,
      name,
      email,
      password,
    });

    const updatedUsers = users;

    const updatedUsersData = JSON.stringify(updatedUsers, null, 2);
    // const updatedData = JSON.parse(updatedUsersData);
    // console.log(updatedData);

    fs.writeFileSync(
      "./src/app/util/db.js",
      `export const = ${updatedUsersData};`,
      "utf-8"
    );

    return NextResponse.json({
      success: "User created successfully",
    });
  }
}

//update user
export async function PUT(req, res) {
  const { id, name, email, password } = await req.json();

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return NextResponse.json({
      result: "User not found",
      status: 404,
    });
  }
  if (name) {
    users[index].name = name;
  }
  if (email) {
    users[index].email = email;
  }
  if (password) {
    users[index].password = password;
  }

  const updatedUsers = users;

  const updatedUsersData = JSON.stringify(updatedUsers, null, 2);

  fs.writeFileSync(
    "./src/app/util/db.js",
    `export const = ${updatedUsersData};`,
    "utf-8"
  );

  return NextResponse.json({
    success: "User updated successfully",
  });
}
