import React from "react";

export default function Profile({ user }) {
  const yearJoined = new Date(user.joined).getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthJoined = new Date(user.joined).getMonth();
  const dayJoined = new Date(user.joined).getDay();
  return (
    <div>
      <h1>{user.name}</h1>
      <h5>{user.email}</h5>
      <h5>{`${months[monthJoined]} ${dayJoined}       , ${yearJoined}`}</h5>
    </div>
  );
}
