// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import CardActionArea from "@mui/material/CardActionArea";
// import MDTypography from "components/MDTypography";

// const cards = [
//   {
//     id: 1,
//     title: "Plants",
//     description: "Plants are essential for all life.",
//   },
//   {
//     id: 2,
//     title: "Animals",
//     description: "Animals are a part of nature.",
//   },
//   {
//     id: 3,
//     title: "Humans",
//     description: "Humans depend on plants and animals for survival.",
//   },
// ];

// function SelectActionCard() {
//   const [selectedCard, setSelectedCard] = React.useState(0);
//   return (
//     <Card>
//       <Box
//         p={3}
//         mb={2}
//         width="100%"
//         sx={{
//           width: "100%",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
//           gap: 2,
//         }}
//       >
//         <MDTypography variant="h5" gutterBottom>
//           Upcoming Events
//         </MDTypography>
//         {cards.map((card, index) => (
//           <Card key={index}>
//             <CardActionArea
//               onClick={() => setSelectedCard(index)}
//               data-active={selectedCard === index ? "" : undefined}
//               sx={{
//                 height: "100%",
//                 "&[data-active]": {
//                   backgroundColor: "action.selected",
//                   "&:hover": {
//                     backgroundColor: "action.selectedHover",
//                   },
//                 },
//               }}
//             >
//               <CardContent sx={{ height: "100%" }}>
//                 <Typography variant="h5" component="div">
//                   {card.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.primary">
//                   {card.description}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Card>
//   );
// }

// export default SelectActionCard;
import React from "react";
import PropTypes from "prop-types";
import { Card, Typography, Box } from "@mui/material";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";

const EventCard = ({ date, title, time, sidenavColor }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        mb: 2,
        backgroundColor: darkMode ? "background.default" : "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignContent: "center", width: "100%" }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: darkMode ? "#3949ab" : sidenavColor || "primary.main",
            borderRadius: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
            px: 3,
            mr: 2,
          }}
        >
          <Typography variant="body2">{date.month}</Typography>
          <Typography variant="h6">{date.day}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <MDTypography variant="h6" color={darkMode ? "white" : "text.primary"}>
            {title}
          </MDTypography>
          <MDTypography
            variant="button"
            ml={1}
            color={darkMode ? "white" : "text"}
            fontWeight="light"
          >
            {time}
          </MDTypography>
        </Box>
        <MDButton
          component="a"
          variant="gradient"
          color={sidenavColor}
          sx={{
            height: 50,
            width: 60,
            marginLeft: "auto",
            minWidth: "unset",
            padding: "0.5rem",
          }}
        >
          View
        </MDButton>
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  date: PropTypes.shape({
    month: PropTypes.string.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  sidenavColor: PropTypes.string,
};

const UpcomingEvents = ({ events = [] }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card
      sx={{
        padding: 3,
        mb: 3,
      }}
    >
      <Typography variant="h5" gutterBottom color={darkMode ? "white" : "text.primary"}>
        Upcoming Events
      </Typography>
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventCard key={index} {...event} sidenavColor={controller.sidenavColor} />
        ))
      ) : (
        <Typography color={darkMode ? "text.secondary" : "text.secondary"}>
          No upcoming events.
        </Typography>
      )}
    </Card>
  );
};

UpcomingEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.shape({
        month: PropTypes.string.isRequired,
        day: PropTypes.number.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ),
};

export default UpcomingEvents;
