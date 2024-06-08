import axios from "axios";
import { useState, FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import type {
  INewExhibit,
  IOverviewObject,
  IExhibitProps,
} from "../Types/frontend";

export default function Exhibits({ setExhibits, exhibits }: IExhibitProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleNewExhibit(e: FormEvent) {
    const newExhibit: INewExhibit = { title };
    if (description.length) newExhibit.description = description;

    e.preventDefault();
    const promise = axios
      .post("/exhibits", { ...newExhibit })
      .then((res) => {
        setExhibits((x: IOverviewObject[]) => [res.data, ...x]);
      })
      .catch((e) => {
        console.log(e.response);
        return Promise.reject();
      });
    toast.promise(promise, {
      loading: "Creating exhibit",
      success: "Exhibit created",
      error: "Oops, something went wrong!",
    });
  }

  function handleDelete(id: string, index: number) {
    const promise = axios
      .post("/exhibits/delete", { id })
      .then(() => {
        setExhibits((x: IOverviewObject[]) =>
          x.filter((_: IOverviewObject, i) => i !== index)
        );
      })
      .catch((e) => {
        console.log(e.response);
        return Promise.reject();
      });
    toast.promise(promise, {
      loading: "Deleting exhibit",
      success: "Exhibit deleted",
      error: "Error, try again later",
    });
  }
  return (
    <>
      <Form onSubmit={handleNewExhibit}>
        <Form.Control
          value={title}
          placeholder="Room name"
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
        <Form.Control
          value={description}
          placeholder="Enter a description"
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
        <Button type="submit">New</Button>
      </Form>
      {exhibits.length &&
        exhibits.map((exhibit, index) => {
          return (
            <Card key={uuid()} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{exhibit.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {exhibit.id}
                </Card.Subtitle>
                <Card.Text>{exhibit.description}</Card.Text>
                <Button onClick={() => handleDelete(exhibit.id, index)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}
