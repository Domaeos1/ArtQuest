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

export default function Register({ setUser }: ILoginProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trying, setTrying] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTrying(true);

    const promise = axios
      .post("/register", { user: username, email, password })
      .then((res) => {
        setCookie("user", JSON.stringify(res.data), 2);
        setUser(res.data);
        axios.defaults.headers.common["Authorization"] = res.data.token
          ? `Bearer ${res.data.token}`
          : "";
        navigate("/");
      })
      .catch((e) => {
        console.log(e?.response);
        setTrying(false);
        return Promise.reject();
      });

    toast.promise(promise, {
      loading: "Creating user",
      success: "Registration successful!",
      error: "Could not create user",
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          value={email}
          disabled={trying}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        ></Form.Control>
        <Form.Control
          value={username}
          disabled={trying}
          onChange={(e) => setUsername(e.target.value)}
        ></Form.Control>
        <Form.Control
          type="password"
          value={password}
          disabled={trying}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <Button disabled={trying} type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
