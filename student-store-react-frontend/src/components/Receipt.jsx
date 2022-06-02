import { Stack, Typography } from "@mui/material";
export default function Receipt(lines) {
  return (
    <Stack>
      {lines.map((line, idx) => {
        return (
          <Typography variant="h6" key={idx}>
            {line}
          </Typography>
        );
      })}
    </Stack>
  );
}
