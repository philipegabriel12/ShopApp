import { Layout } from "./Layout";
import { styled } from "@stitches/react";
import { violet } from '@radix-ui/colors'
import { motion } from "framer-motion";

const Span = styled('span', {
    variants: {
        color: {
            violet: {
                color: violet.violet7
            }
        }
    }
})

const H1 = styled(motion.h1, {
    textShadow: "1px 1px 2px grey"
})

export function FirstHome() {
    return (
        <Layout>
             <H1
                initial={{opacity: 0, y:-20}}
                animate={{opacity: 1, y:0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
            >
                This is <Span color="violet">your</Span> home.
            </H1>
        </Layout>
    )
}