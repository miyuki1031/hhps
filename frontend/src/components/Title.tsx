import styles from "./style/Title.module.scss";

interface TitleProps {
 text: string,
 color: string
}



export default function Title({
    text,
    color
 }: TitleProps) {
    return (
        <div className={styles["title-container"]}>
            <span className={styles[color]}>{text.split("").map((str) => {
                return (str);
            })}</span>
        </div>

    );

}