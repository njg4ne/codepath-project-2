import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { placeOrder } from "../utils/order-service";
import { useState } from "react";

export default function UserForm({
  userInfo,
  setUserInfo,
  onSubmit,
  children,
}) {
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);

  function badEmail(value) {
    if (!value || value.trim() == "") {
      return true;
    }
    const at = value.indexOf("@");
    if (at < 1) {
      return true;
    }
    const dot = value.slice(at + 1).indexOf(".");
    if (dot < 1) {
      return true;
    }
    if (value.slice(at + dot + 2).length < 2) {
      return true;
    }
    return false;
  }
  function badName(value) {
    if (!value || value.trim() == "") {
      return true;
    }
    return !(value.trim().length > 2 && value.trim().indexOf(" ") > 0);
  }
  function submit(e) {
    const errors = [badName(userInfo.name), badEmail(userInfo.email)];
    setEmailError(errors[1]);
    setNameError(errors[0]);
    onSubmit(e, errors);
  }
  function modify(e, field) {
    let changed = { ...userInfo };
    changed[field] = e.target.value;
    setUserInfo(changed);
  }

  return (
    <Stack spacing={2} component="form" autoComplete="off" onSubmit={submit}>
      <TextField
        error={nameError}
        placeholder="John Doe"
        label="Full Name"
        inputProps={{ "aria-label": "input full name" }}
        value={userInfo.name}
        onChange={(e) => modify(e, "name")}
      />
      <TextField
        error={emailError}
        placeholder="email@example.com"
        label="Email Address"
        inputProps={{ "aria-label": "input a valid email address" }}
        onChange={(e) => modify(e, "email")}
        value={userInfo.email}
      />
      {children}
    </Stack>
  );
}
