const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex justify-center items-center">
          <span className="loading loading-spinner text-accent loading-xl"></span>
      </main>
    </div>
  );
}

export default Loader;