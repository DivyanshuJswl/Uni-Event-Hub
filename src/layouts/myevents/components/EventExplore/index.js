import React from "react";
import { Grid, Container, Typography, Box, Pagination } from "@mui/material";
import EventCard from "examples/Cards/ProjectCards/indexProject";
import { useMaterialUIController } from "context";

// Mock data for events (replace with your actual data source)
const mockEvents = [
  {
    image: "https://source.unsplash.com/random/300x200?event=1",
    title: "Tech Conference 2023",
    description: "Annual technology summit featuring industry leaders",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=2",
    title: "Art Exhibition",
    description: "Contemporary art showcase from local artists",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=3",
    title: "Music Festival",
    description: "3-day outdoor festival with multiple stages",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=4",
    title: "Startup Pitch Night",
    description: "Early-stage startups present to investors",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=5",
    title: "Cooking Workshop",
    description: "Learn authentic Italian cuisine from master chefs",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=6",
    title: "Yoga Retreat",
    description: "Weekend wellness program in the mountains",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=7",
    title: "Book Launch",
    description: "Meet the author of this year's bestseller",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=8",
    title: "Film Premiere",
    description: "Exclusive screening of the award-winning documentary",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=9",
    title: "Science Fair",
    description: "Interactive exhibits for all ages",
  },
  {
    image: "https://source.unsplash.com/random/300x200?event=10",
    title: "Charity Gala",
    description: "Black-tie fundraiser for children's education",
  },
];

const Explore = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [page, setPage] = React.useState(1);
  const eventsPerPage = 9; // Showing 6 cards per page (2 rows of 3)

  // Calculate current events to display
  const currentEvents = mockEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "background.default" : "grey.100",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: darkMode ? "white" : "text.primary",
            }}
          >
            Explore Events
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: darkMode ? "text.secondary" : "text.primary",
            }}
          >
            Discover upcoming events in your area
          </Typography>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {currentEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard image={event.image} title={event.title} description={event.description} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(mockEvents.length / eventsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: darkMode ? "white" : "text.primary",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
