import { Container } from "@mui/material";
import styles from "./layout.module.scss";

function Layout({ children, className }) {
  return (
    <div className={[styles.container, className].join(" ")}>
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  );
}

export default Layout;
