import { useEffect, useState } from "react";
import { Log } from "../../logging middleware/logger";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Stack,
  Pagination,
  Box,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [readNotifications, setReadNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    Log(
      "frontend",
      "info",
      "component",
      "Notifications component loaded",
      "PASTE_YOUR_ACCESS_TOKEN"
    );
  }, []);

  const getPriority = (type) => {
    switch (type) {
      case "Placement":
        return 100;
      case "Result":
        return 70;
      case "Event":
        return 40;
      default:
        return 0;
    }
  };

  const filteredNotifications =
    selectedType === "All"
      ? notifications
      : notifications.filter(
          (item) => item.Type === selectedType
        );

  const itemsPerPage = 3;

  const paginatedNotifications =
    filteredNotifications.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

  const markAsRead = (id) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = [
        {
          ID: 1,
          Type: "Placement",
          Message: "Google Hiring",
          Timestamp: "2026-04-22",
        },
        {
          ID: 2,
          Type: "Result",
          Message: "Mid Exam Results",
          Timestamp: "2026-04-23",
        },
        {
          ID: 3,
          Type: "Event",
          Message: "Hackathon Event",
          Timestamp: "2026-04-24",
        },
        {
          ID: 4,
          Type: "Placement",
          Message: "Amazon Hiring",
          Timestamp: "2026-04-25",
        },
        {
          ID: 5,
          Type: "Result",
          Message: "Lab Results",
          Timestamp: "2026-04-26",
        },
        {
          ID: 6,
          Type: "Event",
          Message: "Coding Contest",
          Timestamp: "2026-04-27",
        },
      ];

      const sorted = [...data].sort((a, b) => {
        return getPriority(b.Type) - getPriority(a.Type);
      });

      setNotifications(data);
      setPriorityNotifications(sorted.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Typography
        variant="h5"
        sx={{
          mt: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 4,
          p: 4,
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1565c0",
            mb: 3,
          }}
        >
          Priority Notifications
        </Typography>

        <Grid container spacing={3}>
          {priorityNotifications.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.ID}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardContent>
                  <Chip
                    label={item.Type}
                    color="primary"
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.Message}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.Timestamp}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mt: 6,
            mb: 3,
            fontWeight: "bold",
            color: "#1565c0",
          }}
        >
          All Notifications
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={() => {
              setSelectedType("All");
              setPage(1);
            }}
          >
            All
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={() => {
              setSelectedType("Placement");
              setPage(1);
            }}
          >
            Placement
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={() => {
              setSelectedType("Result");
              setPage(1);
            }}
          >
            Result
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={() => {
              setSelectedType("Event");
              setPage(1);
            }}
          >
            Event
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {paginatedNotifications.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.ID}>
              <Card
                onClick={() => markAsRead(item.ID)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: "0.3s",
                  backgroundColor: readNotifications.includes(item.ID)
                    ? "#f0f0f0"
                    : "#ffffff",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardContent>
                  <Chip
                    label={item.Type}
                    color="secondary"
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: readNotifications.includes(item.ID)
                        ? "normal"
                        : "bold",
                    }}
                  >
                    {item.Message}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.Timestamp}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Pagination
            count={Math.ceil(
              filteredNotifications.length / itemsPerPage
            )}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;