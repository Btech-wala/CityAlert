import { Github, Info, ShieldCheck, ScrollText, Star, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import './Footer.css';
import logoF from './logoo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "CityAlert",
      links: [
        { name: "About", href: "/about", icon: Info, color: "text-emerald-500" },
        { name: "Features", href: "/#features", icon: Star, color: "text-emerald-500" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy", icon: ShieldCheck, color: "text-emerald-500" },
        { name: "Terms", href: "/terms", icon: ScrollText, color: "text-emerald-500" },
      ],
    },
  ];

  return (
    <footer className="footer-glass border-t pt-12 pb-6 text-gray-600 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
            </div>
            <p className="mt-4 max-w-md text-sm">
              Cityalert is designed to empower and inform citizens. Stay informed, make better decisions, and explore features built for civic engagement.
            </p>
          
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              {/* Removed conflicting Tailwind classes for size and weight */}
              <h3 className="mb-4 pb-2 relative heading-rainbow-gradient heading-underline">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-emerald-500 transition-colors duration-200 flex items-center gap-2 group link-bounce"
                    >
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                      <span className="link-text">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
            <div className="text-center md:text-left text-muted-foreground dark:text-muted-foreground">
              <p>© {currentYear} Cityalert. All rights reserved.</p>
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground">
              Built by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-600 dark:hover:text-green-400 transition-colors"
              >
                Raju K.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
