import express from "express";
import { createUser, getUsersByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
    
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      throw new Error("Missing required fields");
    }
    const existingUser = await getUsersByEmail(email);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
