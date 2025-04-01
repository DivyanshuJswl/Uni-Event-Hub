import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Divider,
  Icon,
  Modal,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Fade,
  Backdrop,
  Grid,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import CloseIcon from "@mui/icons-material/Close";

function EventCard({ image, title, description }) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Clickable Card with Hover Animation */}
      <Card
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: darkMode ? "0 10px 20px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MDBox padding="1rem">
          <MDBox
            component="img"
            src={image}
            alt={title}
            width="100%"
            height="12.5rem"
            sx={{
              objectFit: "cover",
              borderRadius: "lg",
              boxShadow: darkMode ? 2 : 3,
              borderTopLeftRadius: "0.6rem",
              borderTopRightRadius: "0.6rem",
              borderBottomLeftRadius: "0.6rem",
              borderBottomRightRadius: "0.6rem",
              mt: -5,
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />

          {/* ... rest of your card content ... */}
        </MDBox>
      </Card>

      {/* Enhanced Modal with Animations and Backdrop Blur */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: darkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Fade in={open} timeout={300}>
          <Box
            sx={{
              position: "relative",
              width: isMobile ? "90vw" : "70vw",
              maxWidth: "900px",
              maxHeight: "90vh",
              bgcolor: darkMode ? "background.paper" : "background.default",
              boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.2)",
              borderRadius: "16px",
              overflow: "hidden",
              outline: "none",
              transform: open ? "scale(1)" : "scale(0.9)",
              opacity: open ? 1 : 0,
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            {/* Close Button with Animation */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                zIndex: 1,
                color: darkMode ? "white" : "text.primary",
                backgroundColor: darkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Modal Content */}
            <Box sx={{ overflowY: "auto", maxHeight: "90vh" }}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={image}
                    alt={title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "60vh",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: darkMode ? "white" : "text.primary",
                    }}
                  >
                    {title}
                  </Typography>

                  {/* ... rest of your modal content ... */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

EventCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EventCard;
