import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Aarav",
    role: "Resident, Bangalore",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "CityAlert helped me report a huge pothole near my street. The issue was resolved in 3 days!",
  },
  {
    name: "Meera Sharma",
    role: "Teacher, Chennai",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    message:
      "I love how simple and fast CityAlert is. Clean streets and working streetlights again!",
  },
  {
    name: "Ravi Kumar",
    role: "Engineer, Hyderabad",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    message:
      "The platform makes you feel empowered as a citizen. Great civic initiative!",
  },
  {
    name: "Ananya Roy",
    role: "Designer, Kolkata",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    message:
      "Being able to track my report's status makes all the difference. Fantastic work CityAlert!",
  },
  {
    name: "Sanjay Singh",
    role: "Student, Delhi",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    message:
      "Easy to use app with quick responses from local authorities. Highly recommended!",
  },
  {
    name: "Priya Desai",
    role: "Entrepreneur, Mumbai",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    message:
      "Makes community participation simple and effective. Love CityAlert!",
  },
];

const extendedTestimonials = [...testimonials, ...testimonials];

const CARD_WIDTH = 340;
const VISIBLE_CARDS = 3;

const TestimonialCarousel = () => {
  const [offset, setOffset] = useState(0);
  const [currentCenter, setCurrentCenter] = useState(0);
  const intervalRef = useRef(null);

  const speed = 1;
  const frameRate = 16;
  const pauseTime = 1800;

  useEffect(() => {
    let pause = false;
    let frameCount = 0;

    function tick() {
      if (!pause) {
        setOffset((prev) => {
          let next = prev + speed;
          const maxOffset = CARD_WIDTH * testimonials.length;
          if (next >= maxOffset) next = 0;

          const centerIndex = Math.floor(
            (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
          ) % testimonials.length;
          setCurrentCenter(centerIndex);

          if (next % CARD_WIDTH === 0) {
            pause = true;
            setTimeout(() => (pause = false), pauseTime);
          }
          return next;
        });
      }
      frameRef.current = requestAnimationFrame(tick);
    }

    const frameRef = { current: null };
    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const prev = () => {
    setOffset((prev) => {
      let next = prev - CARD_WIDTH;
      const maxOffset = CARD_WIDTH * testimonials.length;
      if (next < 0) next = maxOffset - CARD_WIDTH;
      const centerIndex = Math.floor(
        (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
      ) % testimonials.length;
      setCurrentCenter(centerIndex);
      return next;
    });
  };

  const next = () => {
    setOffset((prev) => {
      let next = prev + CARD_WIDTH;
      const maxOffset = CARD_WIDTH * testimonials.length;
      if (next >= maxOffset) next = 0;
      const centerIndex = Math.floor(
        (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
      ) % testimonials.length;
      setCurrentCenter(centerIndex);
      return next;
    });
  };

  return (
    <div style={{ margin: "4rem auto", maxWidth: `${VISIBLE_CARDS * CARD_WIDTH}px` }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: "2.4rem",
          marginBottom: "2rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        What Citizens Say
      </h2>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          padding: "2rem 0",
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.3s ease-out",
            transform: `translateX(-${offset}px)`,
          }}
        >
          {extendedTestimonials.map((t, index) => {
            const relativeIndex = index % testimonials.length;
            const distance = Math.abs(relativeIndex - currentCenter);
            const scale = distance === 0 ? 1.15 : distance === 1 ? 0.9 : 0.8;
            const opacity = distance <= 1 ? 1 : 0.5;
            const zIndex = distance === 0 ? 10 : 1;

            return (
              <div
                key={index}
                style={{
                  minWidth: `${CARD_WIDTH - 20}px`,
                  margin: "0 10px",
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "2rem 1.8rem",
                  boxShadow:
                    distance === 0
                      ? "0 15px 35px rgba(22,163,74,0.2)"
                      : "0 6px 15px rgba(0,0,0,0.05)",
                  transform: `scale(${scale})`,
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                  textAlign: "center",
                  cursor: "default",
                  opacity,
                  zIndex,
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    border: "5px solid #16a34a",
                    marginBottom: "1.5rem",
                    objectFit: "cover",
                    boxShadow: "0 4px 10px rgba(22,163,74,0.25)",
                  }}
                />
                <p
                  style={{
                    fontStyle: "italic",
                    marginBottom: "1.8rem",
                    minHeight: "85px",
                    fontSize: "1.05rem",
                    lineHeight: "1.4",
                    color:"black"
                  }}
                >
                  “{t.message}”
                </p>
                <h3 style={{ marginBottom: "0.3rem", fontWeight: "700", fontSize: "1.3rem", color:"black"}}>
                  {t.name}
                </h3>
                <p style={{ fontSize: "1rem", fontWeight: "500", color:"black" }}>{t.role}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "#16a34a",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "26px",
            fontWeight: "700",
            boxShadow: "0 6px 14px rgba(22,163,74,0.4)",
            transition: "background-color 0.3s ease",
            zIndex: 15,
          }}
        >
          ❮
        </button>

        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "#16a34a",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "26px",
            fontWeight: "700",
            boxShadow: "0 6px 14px rgba(22,163,74,0.4)",
            transition: "background-color 0.3s ease",
            zIndex: 15,
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;