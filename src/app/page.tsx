// import Image from "next/image";
// import styles from "./page.module.css";
import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from "@/components/Buttons/Buttons";

export default function Home() {
    return (
        <div>
            <PrimaryButton text="السلام" href="https://aliflang.org" />
            <br />
            <SecondaryButton text="السلام عليكم" href="https://aliflang.org" />
            <br />
            <TertiaryButton text="السلام عليكم" href="https://aliflang.org" />
        </div>
    );
}
