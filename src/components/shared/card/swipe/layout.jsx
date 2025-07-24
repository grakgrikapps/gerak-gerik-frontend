import styles from "./layout.module.scss";

function Layout({ children, className }) {
  return (
    <div className={[styles.container, className].join(" ")}>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
