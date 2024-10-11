import { headers } from "next/headers";
import Env from "@/config/env";

export async function fetchPosts() {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/post`, 
    {
    cache: "no-cache",
    headers: customHeaders,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

export async function fetchUsers() {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/user`, {
    cache: "no-cache",
    headers: customHeaders,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Fetch user posts
export async function fetchUserPosts() {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/user/post`, {
    headers: customHeaders,
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response!.data;
}

// * Fetch user comments
export async function fetchUserComments() {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
    headers: customHeaders,
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response!.data;
}

// * display post
export async function fetchSinglePost(id: number) {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
    cache: "no-cache",
    headers: customHeaders,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Show user with their posts and comments
export async function fetchUser(id: number) {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
    cache: "no-cache",
    headers: customHeaders,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

// * Fetch user Notifications
export async function getNotifications() {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/notifications`, {
    headers: customHeaders,
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

// *  explore the users
export async function searchUser(query: string) {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`, {
    cache: "no-cache",
    headers: customHeaders,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}