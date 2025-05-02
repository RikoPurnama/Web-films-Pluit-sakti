import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0F172A] py-10 text-white">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-600 pb-10">
          <div>
            <ul className="space-y-3">
              <li><Link to="" className="hover:underline">FAQ</Link></li>
              <li><Link to="" className="hover:underline">Relasi Investor</Link></li>
              <li><Link to="" className="hover:underline">Cara Menonton</Link></li>
              <li><Link to="" className="hover:underline">Informasi Perusahaan</Link></li>
              <li><Link to="" className="hover:underline">Hanya di Pluit Sakti</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <li><Link to="" className="hover:underline">Pusat Bantuan</Link></li>
              <li><Link to="" className="hover:underline">Pekerjaan</Link></li>
              <li><Link to="" className="hover:underline">Aturan Penggunaan</Link></li>
              <li><Link to="" className="hover:underline">Kontak Kami</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <li><Link to="" className="hover:underline">Akun</Link></li>
              <li><Link to="" className="hover:underline">Privasi</Link></li>
              <li><Link to="" className="hover:underline">Tes Kecepatan</Link></li>
              <li><Link to="" className="hover:underline">Pusat Media</Link></li>
              <li><Link to="" className="hover:underline">Pengaturan cookie</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-semibold text-lg">Dapatkan Aplikasi</h2>
            <div className="flex flex-col gap-2">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img src="/appStore.png" alt="App Store" className="w-28 hover:opacity-90 transition" />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img src="/Google_Play.png" alt="Google Store" className="w-28 hover:opacity-90 transition" />
              </a>
            </div>
            <div className="mt-6">
              <h3 className="mb-2">Ikuti Kami</h3>
              <div className="flex gap-4 text-lg">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                  <FaYoutube />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                  <FaFacebookF />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/erickoooo" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src="/Pluit_sakti_2.png" alt="Logo Pluit Sakti" className="w-32" />
            </Link>
            <p className="text-sm">&copy; {currentYear} All rights reserved</p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="">Aturan</Link>
            <Link to="">Privasi</Link>
            <Link to="">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
