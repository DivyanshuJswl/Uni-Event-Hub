import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMaterialUIController } from "context";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CertificatePublisher = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;

  const onSubmit = (data) => {
    console.log("Certificate Data:", data);
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
              <MDTypography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: darkMode ? "white" : "text.primary",
                  mb: 3,
                }}
              >
                Publish Winner Certificates
              </MDTypography>
              <MDTypography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                Upload certificates and details for top 3 winners
              </MDTypography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  {/* Event Name Field */}
                  <Grid item xs={12}>
                    <MDBox
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: darkMode ? "background.default" : "grey.50",
                      }}
                    >
                      <MDTypography variant="h5" sx={{ mb: 2 }}>
                        Event details
                      </MDTypography>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={12}>
                          <Controller
                            name={`event-name`}
                            control={control}
                            defaultValue=""
                            render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                              <MDInput
                                inputRef={ref}
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label={`Enter Event Name`}
                                type="text"
                                variant="outlined"
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
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  {[1, 2, 3].map((position, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12}>
                        <MDBox
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: darkMode ? "background.default" : "grey.50",
                          }}
                        >
                          <MDTypography variant="h5" sx={{ mb: 2 }}>
                            Position #{position} Winner
                          </MDTypography>

                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Controller
                                name={`winner${position}Email`}
                                control={control}
                                defaultValue=""
                                render={({ field: { ref, onChange, value, ...fieldProps } }) => (
                                  <MDInput
                                    inputRef={ref}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    label={`Winner ${position} Email`}
                                    type="email"
                                    variant="outlined"
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
                            <Grid item xs={12} md={6}>
                              <Controller
                                name={`winner${position}Certificate`}
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                  <MDButton
                                    component="label"
                                    variant="outlined"
                                    color={darkMode ? "secondary" : "primary"}
                                    fullWidth
                                    startIcon={<CloudUploadIcon />}
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
                                  >
                                    {field.value?.name || "Upload Certificate"}
                                    <input
                                      type="file"
                                      hidden
                                      accept="image/*,.pdf"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          setValue(`winner${position}Certificate`, file);
                                        }
                                      }}
                                    />
                                  </MDButton>
                                )}
                              />
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Grid>

                      {index < 2 && (
                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}

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
                      Publish Certificates
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

export default CertificatePublisher;
