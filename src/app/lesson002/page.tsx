import CounterContainer from "./components/CounterContainer";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CounterContainer title="React Counter" />
    </main>
  );
};

export default Home;
