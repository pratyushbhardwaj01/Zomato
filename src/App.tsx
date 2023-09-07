import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <main className="backgroundImage h-[100vh] w-[100vw] flex flex-col ">
      <section className="">
        <Header />
      </section>
      <section
        id="detail"
        className="grow flex flex-col justify-center items-stretch lg:items-center lg:justify-center h-[calc(100vh-140px)] overflow-scroll p-[10px]"
      >
        <Outlet />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}

export default App;
