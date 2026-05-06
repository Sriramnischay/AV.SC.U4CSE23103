import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
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
      ];

      const sorted = [...data].sort((a, b) => {
        return getPriority(b.Type) - getPriority(a.Type);
      });

      setNotifications(data);
      setPriorityNotifications(sorted.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      <Grid container spacing={2}>
        {priorityNotifications.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.ID}>
            <Card>
              <CardContent>
                <Chip label={item.Type} sx={{ mb: 2 }} />

                <Typography variant="h6">
                  {item.Message}
                </Typography>

                <Typography variant="body2">
                  {item.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 5 }} gutterBottom>
        All Notifications
      </Typography>

      <Grid container spacing={2}>
        {notifications.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.ID}>
            <Card>
              <CardContent>
                <Chip label={item.Type} sx={{ mb: 2 }} />

                <Typography variant="h6">
                  {item.Message}
                </Typography>

                <Typography variant="body2">
                  {item.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;