import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ILoginProps } from "../Types/frontend";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export default function Login({ setUser }: ILoginProps) {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [trying, setTrying] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTrying(true);
    const promise = axios
      .post("/login", { identifier, password })
      .then((res) => {
        setCookie("user", JSON.stringify(res.data), 2);
        setUser(res.data);
        axios.defaults.headers.common["Authorization"] = res.data.token
          ? `Bearer ${res.data.token}`
          : "";
        navigate("/");
      })
      .catch((e) => {
        console.log(e.response);
        setTrying(false);
        return Promise.reject("Error");
      });
    toast.promise(promise, {
      loading: "Logging in",
      success: "Logged in!",
      error: "Error logging in",
    });
  }

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          value={identifier}
          disabled={trying}
          onChange={(e) => setIdentifier(e.target.value)}
        ></Form.Control>
        <Form.Control
          type="password"
          value={password}
          disabled={trying}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <Button type="submit" disabled={trying}>
          Login
        </Button>
      </Form>
    </>
  );
}
