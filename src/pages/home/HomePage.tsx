import React from "react";
// import { useFetchData } from "../../lib/useFetchData";
import { withFetchData } from "../../lib/withFetchData";
import { PostResponse } from "../../lib/model";

import { Typography, Container, Grid, Card, CardContent } from "@mui/material";

const url = "https://codaisseur-coders-network.herokuapp.com/posts";

export default withFetchData<PostResponse>(url)(function HomePage({
  fetchState,
}) {
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {fetchState.status === "loading" && <p>Loading...</p>}
      {fetchState.status === "error" && <p>ERROR!</p>}
      {fetchState.status === "success" && (
        <Grid container spacing={3}>
          {fetchState.data.rows.map((post) => {
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
});
