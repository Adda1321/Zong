// import Options from './components/CustomizedDialogs';
import NavBar from "../../components/Home/AppBar";

function Layout(props) {
  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
