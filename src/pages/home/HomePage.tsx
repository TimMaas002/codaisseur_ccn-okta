import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import { FetchState } from "../../util/fetchstate";
import { PostResponse } from "../../lib/model";

import { Typography, Container, Grid, Card, CardContent } from "@mui/material";

export default function HomePage() {
  const [state, setState] = useState<FetchState<PostResponse>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      debugger;
      setState({ status: "loading" });
      try {
        const res = await axios.get(
          "https://codaisseur-coders-network.herokuapp.com/posts",
        );
        setState({ status: "success", data: res.data });
      } catch (error) {
        setState({ status: "error", error });
      }
    })();
  }, []);

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>ERROR!</p>}
      {state.status === "success" && (
        <Grid container spacing={3}>
          {state.data.rows.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card>
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
