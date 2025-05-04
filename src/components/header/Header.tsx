import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
      setKeyword("");
      setToggle(false);
    }
  };

  return (
    <header className="w-full fixed bg-[#090617] z-40 shadow-sm">
      <div className="mx-auto px-4 md:px-20 py-3 flex justify-between items-center">
        <div className="flex gap-16">
          <a href="/" className="flex items-center cursor-pointer">
            <img src="/Pluit_sakti.png" alt="Logo Header" className="w-32" />
          </a>

          {/* Navbar tengah di desktop */}
          {isDesktop && (
            <nav className="justify-self-center">
              <ul className="flex gap-8 text-white">
                {["sedang-tayang", "popular", "mendatang", "genre"].map(
                  (route, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={`/${route}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-red-500 font-semibold"
                            : "hover:text-red-500"
                        }
                      >
                        {route === "sedang-tayang"
                          ? "Sedang Tayang"
                          : route === "popular"
                          ? "Terpopuler"
                          : route === "mendatang"
                          ? "Mendatang"
                          : "Genre"}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </nav>
          )}
        </div>

        {/* Search desktop kanan */}
        {isDesktop && (
          <form
            onSubmit={handleSearch}
            className="flex items-center border-b text-white border-slate-600"
          >
            <CiSearch className="text-slate-600" />
            <input
              type="text"
              placeholder="Cari Film..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-transparent py-1 px-2 outline-none text-sm placeholder:text-slate-600"
            />
          </form>
        )}
        {/* Form search fullscreen di mobile */}
        {!isDesktop && (
          <form
            onSubmit={handleSearch}
            className="w-full max-w-[50%] flex items-center border-b text-white border-slate-600"
          >
            <CiSearch className="text-slate-600" />
            <input
              type="text"
              placeholder="Cari Film..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus
              className="bg-transparent py-1 px-2 outline-none text-sm placeholder:text-slate-600"
            />
          </form>
        )}

        {/* Hamburger mobile & tablet */}
        {!isDesktop && (
          <div className="justify-self-end z-50">
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="space-y-1.5 z-50 cursor-pointer"
              name="HamburgerMenu"
            >
              <motion.span
                animate={{ rotateZ: toggle ? 45 : 0, y: toggle ? 8 : 0 }}
                className="block w-8 h-[1px] bg-white rounded"
              />
              <motion.span
                animate={{ width: toggle ? 0 : 24 }}
                className="block w-6 h-[1px] bg-white rounded"
              />
              <motion.span
                animate={{
                  rotateZ: toggle ? -45 : 0,
                  y: toggle ? -8 : 0,
                  width: toggle ? 32 : 16,
                }}
                className="block w-4 h-[1px] bg-white rounded"
              />
            </button>
          </div>
        )}

        
      </div>

      {/* Mobile & Tablet Fullscreen Menu */}
      <AnimatePresence>
        {toggle && (isMobile || isTablet) && (
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 35 }}
            className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center text-white z-40"
          >
            <ul className="text-lg flex flex-col gap-10 text-center">
              {["sedang-tayang", "popular", "mendatang", "genre"].map(
                (route, idx) => (
                  <li key={idx}>
                    <NavLink onClick={() => setToggle(false)} to={`/${route}`}>
                      {route === "sedang-tayang"
                        ? "Sedang Tayang"
                        : route === "popular"
                        ? "Terpopuler"
                        : route === "mendatang"
                        ? "Mendatang"
                        : "Genre"}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
        
    </header>
  );
};

export default Header;
