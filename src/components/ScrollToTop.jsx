import {useState,useEffect} from 'react';
import {FaArrowUp} from 'react-icons/fa';
import {motion,AnimatePresence} from 'framer-motion';

function ScrollToTop() {
  const [isVisible,setIsVisible]=useState(false);

  // Show button when page is scrolled down
  useEffect(()=> {
    const toggleVisibility=()=> {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll',toggleVisibility);
    return ()=> window.removeEventListener('scroll',toggleVisibility);
  },[]);

  const scrollToTop=()=> {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{opacity: 0,scale: 0.8}}
          animate={{opacity: 1,scale: 1}}
          exit={{opacity: 0,scale: 0.8}}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-kadam-deep-green hover:bg-kadam-medium-green text-white p-4 rounded-full shadow-large hover:shadow-glow transition-all duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;