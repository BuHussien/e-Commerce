const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-red-700 via-zinc-950 to-rose-500 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-yellow-300 text-xl">
          © {currentYear} Noor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
