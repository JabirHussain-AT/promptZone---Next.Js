import "@/styles/globals.css";
import Nav from "@components/Nav";
import Provaider from "@components/Provaider";

export const metadata = {
  title: "promptZone",
  description: "Discover and Share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provaider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provaider>
      </body>
    </html>
  );
};

export default RootLayout;
