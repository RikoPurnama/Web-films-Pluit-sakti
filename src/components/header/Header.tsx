import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [toggle, setToggle] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
      setKeyword("");
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="w-full fixed bg-[#090617] z-40 shadow-sm">
      <div className="container mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
        <div className="flex gap-20 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/Pluit_sakti.png" alt="Logo Header" className="w-32" />
          </a>

          {/* Desktop Navigation */}
          {matches && (
            <nav>
              <ul className="flex gap-8 text-white">
                {["sedang-tayang", "popular", "mendatang"].map((route, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={`/${route}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-red-500 font-semibold"
                          : "hover:text-red-400"
                      }
                    >
                      {route === "sedang-tayang"
                        ? "Sedang Tayang"
                        : route === "popular"
                        ? "Terpopuler"
                        : "Mendatang"}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Desktop Search */}
        {matches ? (
          <form
            onSubmit={handleSearch}
            className="flex items-center text-white border-b border-white"
          >
            <CiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Cari Film..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-transparent py-1 px-2 outline-none text-sm"
            />
          </form>
        ) : (
          // Mobile Search Button
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowMobileSearch(true)}
              className="text-white text-2xl"
            >
              <CiSearch />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="space-y-1.5 z-50"
              name="HumburgerMenu"
            >
              <motion.span
                animate={{ rotateZ: toggle ? 45 : 0, y: toggle ? 8 : 0 }}
                className="block w-8 h-0.5 bg-white rounded"
              />
              <motion.span
                animate={{ width: toggle ? 0 : 24 }}
                className="block w-6 h-0.5 bg-white rounded"
              />
              <motion.span
                animate={{
                  rotateZ: toggle ? -45 : 0,
                  y: toggle ? -8 : 0,
                  width: toggle ? 32 : 16,
                }}
                className="block w-4 h-0.5 bg-white rounded"
              />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {toggle && !matches && (
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 35 }}
            className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center text-white z-40"
          >
            <ul className="text-lg flex flex-col gap-10 text-center">
              <li>
                <NavLink onClick={() => setToggle(false)} to="/sedang-tayang">
                  Sedang Tayang
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setToggle(false)} to="/popular">
                  Terpopuler
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setToggle(false)} to="/mendatang">
                  Mendatang
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Mobile Search Input Fullscreen */}
        {showMobileSearch && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center px-6 z-50"
          >
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <input
                type="text"
                placeholder="Cari Film..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
                className="w-full py-3 px-4 text-lg bg-transparent border border-white text-white rounded outline-none placeholder:text-white"
              />
            </form>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="mt-4 text-white text-2xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
