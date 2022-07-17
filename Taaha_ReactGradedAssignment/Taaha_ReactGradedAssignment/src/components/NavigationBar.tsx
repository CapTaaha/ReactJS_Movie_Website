import {Navbar,Container,Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const NavigationBar = () => {
   return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand to="/" as={NavLink}>Movies On The Tip</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to="/movies-coming" as={NavLink}>Upcoming Movies</Nav.Link>
          <Nav.Link to="/movies-in-theaters" as={NavLink}>Movies in theatres</Nav.Link>
          <Nav.Link to="/top-rated-india" as={NavLink}>Top rated India</Nav.Link>
          <Nav.Link to="/top-rated-movies" as={NavLink}>Top rated movies</Nav.Link>
          <Nav.Link to="/favourite" as={NavLink}>Favourites</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
   )
}

export default NavigationBar