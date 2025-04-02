import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";
import { BASE_URL } from "utils/constants";
import { descriptors } from "chart.js/dist/core/core.defaults";

const CreateEvent = () => {
  const { handleSubmit, control, register } = useForm();
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [date, setDate] = useState();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleCreateEvent = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/events/create",
        { title, Description, maxParticipants, date, location, category },
        { withCredentials: true }
      );
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "background.default" : "grey.100",
        py: 4,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={8}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: darkMode ? 1 : 3,
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: darkMode ? "white" : "text.primary",
                  mb: 3,
                }}
              >
                Create New Event
              </Typography>
              <p>{error}</p>

              <form onSubmit={handleCreateEvent}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                        <TextField
                          inputRef={ref}
                          onChange={(e) => setTitle(e.target.value)}
                          value={value}
                          fullWidth
                          label="Event Title"
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                          {...fieldProps}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          multiline
                          rows={4}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="date"
                        control={control}
                        defaultValue={null}
                        render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                          <DatePicker
                            inputRef={ref}
                            onChange={(e) => setDate(e.target.value)}
                            value={value || null}
                            label="Event Date"
                            sx={{
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                ...fieldProps,
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Event Time"
                          type="time"
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                          <Select
                            inputRef={ref}
                            onChange={(e) => setCategory(e.target.value)}
                            value={value}
                            labelId="category-label"
                            label="Category"
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              height: 56,
                            }}
                            {...fieldProps}
                          >
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="capacity"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          onChange={(e) => setMaxParticipants(e.target.value)}
                          label="Capacity"
                          type="number"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="url"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Event URL"
                          type="url"
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="location"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Location (Online or Venue)"
                          onChange={(e) => setLocation(e.target.value)}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderColor: darkMode ? "grey.700" : "grey.400",
                        "&:hover": {
                          borderColor: darkMode ? "grey.600" : "grey.500",
                        },
                      }}
                      htmlFor="cover-image" // Associate label with input
                    >
                      Upload Cover Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        id="cover-image"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Use react-hook-form's setValue to update the form state
                            setValue("coverImage", file);
                          }
                        }}
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        color: darkMode ? "white" : "text.primary",
                      }}
                    >
                      Event Settings
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Controller
                        name="enableRegistration"
                        control={control}
                        defaultValue={false}
                        render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                inputRef={ref}
                                onChange={onChange}
                                checked={value}
                                color={darkMode ? "secondary" : sidenavColor || "primary"}
                                {...fieldProps}
                              />
                            }
                            label="Enable Registration"
                            sx={{ color: sidenavColor }}
                          />
                        )}
                      />
                      <Controller
                        name="digitalCertificates"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...field}
                                color={darkMode ? "secondary" : sidenavColor || "primary"}
                              />
                            }
                            label="Issue Digital Certificates"
                            sx={{ color: darkMode ? "text.secondary" : "text.primary" }}
                          />
                        )}
                      />

                      <Controller
                        name="sendReminders"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...field}
                                color={darkMode ? "secondary" : sidenavColor || "primary"}
                              />
                            }
                            label="Send Reminder Emails"
                            sx={{ color: darkMode ? "text.secondary" : "text.primary" }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color={sidenavColor}
                      fullWidth
                      size="large"
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Publish Event
                    </MDButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateEvent;
