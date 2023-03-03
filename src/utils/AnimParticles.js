const pop = (e, particles = "❤️") => {
  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = e.currentTarget.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 6; i++) {
      // We call the function createParticle 30 times
      // We pass the coordinates of the button for x & y values
      createParticle(x, y, particles);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      // We call the function createParticle 30 times
      // As we need the coordinates of the mouse, we pass them as arguments
      createParticle(e.clientX, e.clientY, particles);
    }
  }
}

const createParticle = (x, y, particles) => {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);
  // let width = Math.floor(Math.random() * 30 + 8);
  // let height = width;

  particle.innerHTML = particles;
  particle.style.fontSize = `${Math.random() * 20 + 16}px`;
  // width = height = 'auto';

  // Generate a random x & y destination within a distance of 75px from the mouse
  const destinationX = x + (Math.random() - 0.5) * 2 * 120;
  const destinationY = y + (Math.random() - 0.5) * 2 * 60;

  // Store the animation in a variable as we will need it later
  const animation = particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 1,
      },
    ],
    {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 500 + 1000,
      easing: "cubic-bezier(0,.47,.52,1)",
      // Delay every particle with a random value of 200ms
      delay: 0,
    }
  );

  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    const animation2 = particle.animate(
      [
        {
          // Set the origin position of the particle
          top: `${destinationY}px`,
          left: `${destinationX}px`,
          opacity: 1,
          zIndex: 10,
        },
        {
          top: '8rem',
          left: '97%',
          opacity: 0,
          zIndex: 10,
        },
      ],
      {
        // Set a random duration from 500 to 1500ms
        duration: 1000,
        easing: "cubic-bezier(.96,0,1,1)",
        // Delay every particle with a random value of 200ms
        delay: 0,
      }
    );
    animation2.onfinish = () => {
      particle.remove();
    }

  };
}

// export pop function with another name
export { pop as AnimParticles };