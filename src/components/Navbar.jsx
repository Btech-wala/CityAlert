// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Switch from '../DarkModeToggle';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <header
//       className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur"
//       style={{
//         '--tw-bg-opacity': '0.95',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)'
//       }}
//     >
//       <div className="container flex h-14 items-center justify-between">
//         <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6 text-emerald-500"
//           >
//             <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//             <circle cx="12" cy="10" r="3" />
//           </svg>
//           <span className="text-xl font-bold">Civix</span>
//         </button>
//         <nav className="hidden md:flex gap-6">
//           <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Features
//           </a>
//           <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             How It Works
//           </a>
//           <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Testimonials
//           </a>
//           <a href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             FAQ
//           </a>
//         </nav>
//         <div className="flex items-center gap-4">
//           <Switch />
//           <button
//             onClick={() => navigate('/login')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-9 px-4 py-2"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Switch from '../DarkModeToggle';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isSignedIn, signOut } = useAuth();

  // Close menu on route change or navigation
  const handleNav = (cb) => {
    setMobileMenuOpen(false);
    if (cb) cb();
  };

  // Handle logout
  const handleLogout = async () => {
    if (signOut) {
      await signOut(); // Clerk: clears session and data
    }
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage-update"));
    setProfileDropdownOpen(false);
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onClick = (e) => {
      if (e.target.closest('#mobile-nav-panel') || e.target.closest('#mobile-nav-toggle')) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileMenuOpen]);

  // ✅ Check if logged-in user is admin
  const token = localStorage.getItem('token');
  let isAdmin = false;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 'admin';
    }
  } catch (err) {
    console.error('Invalid token');
  }

  const navLinks = [
    {
      title: "Civic Education & Rights",
      href: "/civic-education"
    },
    {
      title: "About",
      href: "/about"
    },
    {
      title: "Contact Us",
      href: "/contact"
    },

  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <button onClick={() => { setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300" style={{ width: "74px", marginLeft: "21px" }}
        >

          <span id="logo" className="text-xl font-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>  </span>
        </button>

        {/* Desktop nav - only show on large screens */}
        <nav className="hidden lg:flex gap-6">
          {navLinks.map((navItem) => (
            <Link key={navItem.title}
              to={navItem.href}
              className='text-sm font-medium hover:text-emerald-500 transition-colors duration-300'
            >
              {navItem.title}
            </Link>
          ))}
        </nav>


        {/* Hamburger for mobile and tablet */}
        <button
          id="mobile-nav-toggle"
          className="lg:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        <div className="flex items-center gap-4">
          <Switch />

          {/* Profile Icon with Dropdown for authenticated users */}
          {(isSignedIn || token) && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900 dark:hover:bg-emerald-800 transition-colors duration-200"
                aria-label="Profile menu"
              >
                <svg
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate(isAdmin ? '/admin' : '/user/dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/admin');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Admin Panel
                    </button>
                  )}

                  <hr className="my-2 border-gray-200 dark:border-gray-700" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dashboard link for authenticated users */}
          {(isSignedIn || token) && (
            <button
              onClick={() => navigate(isAdmin ? '/admin' : '/user/dashboard')}
              className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-9 px-4 py-2"
            >
              Dashboard
            </button>
          )}

          {/* Show logout button when authenticated, login/signup when not */}
          {isSignedIn || token ? (
            <button
              onClick={handleLogout}
              className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-white hover:bg-emerald-600 h-9 px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-600 h-9 px-4 py-2"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile/Tablet menu overlay and panel */}
      {mobileMenuOpen && (
        <>
          {/* Dark overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="lg:hidden fixed inset-x-0 top-0 z-[100] animate-fade-slide-up">
            <nav id="mobile-nav-panel" className="relative flex flex-col items-center w-full h-[100vh] bg-white dark:bg-[#18181b] pt-24 gap-6 shadow-xl">
              <button
                className="absolute top-6 right-6 text-3xl text-emerald-600 focus:outline-none"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                &times;
              </button>

              {navLinks.map((navItem) => (
                <Link key={navItem.title}
                  to={navItem.href}
                  onClick={() => handleNav()}
                  className='text-lg font-medium hover:text-emerald-500 transition-colors duration-300'
                >
                  {navItem.title}
                </Link>
              ))}

              {/* Profile link for authenticated users in mobile menu */}
              {(isSignedIn || token) && (
                <button
                  onClick={() => handleNav(() => navigate('/profile'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-11 px-4 py-2"
                >
                  Profile
                </button>
              )}

              {/* Dashboard link for authenticated users in mobile menu */}
              {(isSignedIn || token) && (
                <button
                  onClick={() => handleNav(() => navigate(isAdmin ? '/admin' : '/user/dashboard'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-11 px-4 py-2"
                >
                  Dashboard
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleNav(() => navigate('/admin'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 h-11 px-4 py-2"
                >
                  Admin Dashboard
                </button>
              )}

              {/* Show logout button when authenticated, login/signup when not */}
              {isSignedIn || token ? (
                <button
                  onClick={() => handleNav(handleLogout)}
                  className="w-11/12 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-11 px-4 py-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleNav(() => navigate('/login'))}
                    className="w-11/12 rounded-md text-base font-medium border border-input hover:bg-accent hover:text-accent-foreground h-11 px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav(() => navigate('/signup'))}
                    className="w-11/12 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-11 px-4 py-2"
                  >
                    Get Started
                  </button>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Switch from '../DarkModeToggle';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <header
//       className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur"
//       style={{
//         '--tw-bg-opacity': '0.95',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)'
//       }}
//     >
//       <div className="container flex h-14 items-center justify-between">
//         <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6 text-emerald-500"
//           >
//             <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//             <circle cx="12" cy="10" r="3" />
//           </svg>
//           <span className="text-xl font-bold">Civix</span>
//         </button>
//         <nav className="hidden md:flex gap-6">
//           <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Features
//           </a>
//           <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             How It Works
//           </a>
//           <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Testimonials
//           </a>
//           <a href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             FAQ
//           </a>
//         </nav>
//         <div className="flex items-center gap-4">
//           <Switch />
//           <button
//             onClick={() => navigate('/login')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-9 px-4 py-2"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
