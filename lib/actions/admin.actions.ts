"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";

export const getAllUsers = async () => {
  const { databases } = await createAdminClient();

  const users = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.orderDesc("$createdAt")]
  );

  return users.documents;
};

export const updateUserRole = async (userId: string, role: string) => {
  const { databases } = await createAdminClient();

  await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    userId,
    { role }
  );
};

export const deleteUserById = async (userId: string) => {
  const { databases } = await createAdminClient();

  await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    userId
  );
};
