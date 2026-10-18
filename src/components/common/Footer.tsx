const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-400 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-800 text-xl">
          © {currentYear} NourLight. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
