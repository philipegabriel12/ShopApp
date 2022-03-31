import { motion } from "framer-motion";
import { Layout } from "./Layout";

const loadingContainer = {
    width: "8rem",
    height: "8rem",
    display: "flex",
    justifyContent: "space-around"
  };
  
  const loadingCircle = {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: "white",
    borderRadius: "50%"
  };
  
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const loadingCircleVariants = {
    start: {
      y: "50%"
    },
    end: {
      y: "150%"
    }
  };
  
  const loadingCircleTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut"
  };

export function LoadingComponent() {
    return (
        <Layout>
            <motion.div className="mt-5"
                style={loadingContainer}
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
            >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>
        </Layout>
    )
}