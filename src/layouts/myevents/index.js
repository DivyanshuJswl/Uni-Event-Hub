// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Explore from "./components/EventExplore";

function MyEvents() {
  return (
    // <Explore />
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <Explore />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyEvents;
