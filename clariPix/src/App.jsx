import Home from "./components/Home";
import DarkToggle from "./components/DarkToggle";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300 text-gray-900 dark:text-white flex flex-col justify-between">
      {/* Header */}
      <header className="text-center py-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
          Har Photo Mein Dikhni Chahiye Jaan!
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
          Ab har image bolegi — main HD hoon!
        </p>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        Powered with ❤️ by{" "}
        <span className="font-semibold text-blue-500">Aditya Chaudhary</span>
      </footer>
    </div>
  );
};

export default App;
