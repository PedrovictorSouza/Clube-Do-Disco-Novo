import styles from "./styles.module.css";

const AnimatedCircles = () => {
    return (
        <>
            {Array.from({ length: 5 }, (_, i) => (
                <div
                    key={i}
                    className={styles.animatedCircle}
                    style={{ animationDelay: `${i * 4}s` }}
                />
            ))}
        </>
    );
};

export default AnimatedCircles;
