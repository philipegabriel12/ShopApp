import { Layout } from "./Layout";
import { styled } from "@stitches/react";
import { violet } from '@radix-ui/colors'
import { motion } from "framer-motion";

const Span = styled('span', {
    variants: {
        color: {
            violet: {
                color: violet.violet7
            },
            cardText: {
                color: "white",
                fontSize: 18,
            }
        },
        position: {
            bottom: {
                position: "absolute",
                bottom: "12px",
                right: "12px",
                textShadow: "1px 1px 2px grey"
            }
        }
    }
})

const Card = styled(motion.div, {
    variants: {
        cards: {
            violet: {
                minWidth: "100%",
                marginTop: "24px",
                background: violet.violet10,
                borderRadius: "4px",
                boxShadow: "4px 2px",
                height: "200px",
                padding: "12px",
                position: "relative",
            },
            wrapper: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
            },
            item: {
                width: 'inherit',
                height: 'inherit',
                background: 'white',
                transformOrigin: '50% 100%',
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
            <Card cards="violet"
                 initial={{opacity: 0, y:-20}}
                 animate={{opacity: 1, y:0 }}
                 transition={{ duration: 1 }}
                 whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
            >
                <Span color="cardText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 🤩 😎
                </Span>
                <Span color="cardText" position="bottom">
                    Assinado: Lorem Ipsum
                </Span>
            </Card>
        </Layout>
    )
}