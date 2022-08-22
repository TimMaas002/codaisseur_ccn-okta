import React from "react";
import axios from "axios";
import { render, act, screen } from "@testing-library/react";

import HomePage from "./HomePage";

jest.mock("axios");

test("throw error message after render fails", async () => {
  (axios.get as any).mockImplementation(() =>
    Promise.reject("Couldn't get posts"),
  );
  await act(async () => {
    render(<HomePage />);
  });

  const errorMessage = screen.getByText("ERROR!");
  expect(errorMessage).toBeInTheDocument();
});

test("render learn react link", async () => {
  (axios.get as any).mockImplementation(() =>
    Promise.resolve({
      data: {
        count: 2,
        rows: [
          makeFakePost(1, "Fake post #1"),
          makeFakePost(2, "Fake post #2"),
        ],
      },
    }),
  );

  await act(async () => {
    render(<HomePage />);
  });
  const pageTitleE1 = screen.getByText("Codaisseur Coders Network");
  expect(pageTitleE1).toBeInTheDocument();

  const postA = screen.getByText("Fake post #2", {
    selector: "h2",
  });
  expect(postA).toBeInTheDocument();

  const postB = screen.getByText("Fake post #2", {
    selector: "h2",
  });
  expect(postB).toBeInTheDocument();
});

function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:05.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}
