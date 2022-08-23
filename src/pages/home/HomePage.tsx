import React, { useContext } from "react";
import { useFetchData } from "../../lib/useFetchData";
// import { withFetchData } from "../../lib/withFetchData";
import { PostsResponse } from "../../lib/model";
import { ThemeContext } from "../../lib/theme";

import { Typography, Container, Grid, Card, CardContent } from "@mui/material";

export default function HomePage() {
  const state = useFetchData<PostsResponse>(
    "https://codaisseur-coders-network.herokuapp.com/posts",
  );
  const { theme } = useContext(ThemeContext);
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
                    style={{
                      maxHeight: "15rem",
                      overflow: "hidden",
                      backgroundColor: theme.colors.backgroundColor,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ color: theme.colors.textColor }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      style={{ color: theme.colors.textColor }}
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
