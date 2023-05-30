/* eslint-disable */
import { Grid, Paper, Typography } from '@mui/material';

export default function Card({icon,title,value}) {
  return (
    <Grid item xs={8} md={3}>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          width: "15rem",
          height: "10rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {icon}
        </div>
        <div style={{ textAlign: "center", padding: "10%" }}>
          <Typography variant="h6" color="red">
            {title}
          </Typography>
          <Typography variant="h6" color="red">
            {value}
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
}
